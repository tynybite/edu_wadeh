
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { ArrowLeft, Eye, Save, Send } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import { cn } from '@/lib/utils';

// Helper to sanitize/render HTML safely (simple version)
const PreviewPost = ({ title, content, date, category }: any) => (
  <div className="bg-white dark:bg-zinc-950 rounded-3xl border shadow-lg overflow-hidden h-full max-h-[80vh] overflow-y-auto">
    <div className="h-64 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center relative overflow-hidden">
        {/* Mock Hero Image/Pattern to match Home.tsx */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200 via-purple-200 to-transparent" />
    </div>
    <div className="p-8 max-w-3xl mx-auto -mt-20 relative z-10">
      <div className="bg-card rounded-2xl p-8 shadow-sm border">
        <div className="flex items-center gap-3 mb-6">
            <Badge variant="secondary" className="text-secondary-foreground">{category || 'News'}</Badge>
            <span className="text-sm text-muted-foreground">{new Date(date || Date.now()).toLocaleDateString()}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
            {title || 'Untitled Post'}
        </h1>
        <div 
            className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: content || '<p>Start writing to see preview...</p>' }} 
        />
      </div>
    </div>
  </div>
);

export default function NewsEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const [post, setPost] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'News',
    is_active: true,
    published_at: new Date().toISOString()
  });

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', id)
      .single();
    
    if (data) {
      setPost(data);
    }
    setLoading(false);
  };

  const handleSave = async (status: 'draft' | 'published' = 'published') => {
    try {
        setLoading(true);
        const postData = {
            ...post,
            is_active: status === 'published',
            updated_at: new Date().toISOString()
        };

        if (id) {
            await supabase.from('news').update(postData).eq('id', id);
        } else {
            await supabase.from('news').insert([postData]);
        }
        
        toast.success(id ? 'Article updated successfully' : 'Article created successfully');
        navigate('/admin/news');
    } catch (error: any) {
        toast.error('Error saving post: ' + error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/news')}>
                <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">{id ? 'Edit Article' : 'New Article'}</h1>
        </div>
        <div className="flex items-center gap-2">
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="mr-2">
                        <Eye className="h-4 w-4 mr-2" /> Preview
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[90vh] p-0 bg-transparent border-none shadow-none">
                    <PreviewPost {...post} date={post.published_at} />
                </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={() => handleSave('draft')} disabled={loading}>
                <Save className="h-4 w-4 mr-2" /> Save Draft
            </Button>
            <Button onClick={() => handleSave('published')} disabled={loading}>
                <Send className="h-4 w-4 mr-2" /> Publish
            </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="max-w-5xl mx-auto h-full p-6 md:p-10 overflow-y-auto">
             <div className="space-y-4 mb-8">
                <Input 
                    placeholder="Article Title" 
                    value={post.title}
                    onChange={(e) => setPost({...post, title: e.target.value})}
                    className="text-3xl md:text-5xl font-bold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/40 h-auto py-2"
                />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Input 
                        value={post.category} 
                        onChange={(e) => setPost({...post, category: e.target.value})}
                        className="w-32 h-8" 
                        placeholder="Category"
                    />
                    <span>•</span>
                    <span>{new Date().toLocaleDateString()}</span>
                </div>
            </div>

            <RichTextEditor 
                content={post.content} 
                onChange={(html) => setPost({...post, content: html})}
                className="min-h-[600px] border-none shadow-none focus-within:ring-0 p-0"
                placeholder="Tell your story..."
            />
        </div>
      </main>
    </div>
  );
}
