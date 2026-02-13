import { Editor } from '@tinymce/tinymce-react';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  className?: string;
  placeholder?: string;
}

const RichTextEditor = ({ content, onChange, className, placeholder }: RichTextEditorProps) => {
  const editorRef = useRef<any>(null);

  // You can get an API key for free at https://www.tiny.cloud/
  // For now, we rely on the default behavior (which may show a warning)
  // or the user can add VITE_TINYMCE_API_KEY to .env.local
  const apiKey = import.meta.env.VITE_TINYMCE_API_KEY || 'no-api-key';

  return (
    <div className={cn("rounded-xl overflow-hidden border bg-card shadow-sm", className)}>
      <Editor
        apiKey={apiKey}
        onInit={(_evt, editor) => editorRef.current = editor}
        value={content}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          height: 500,
          menubar: true,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px }',
          skin: 'oxide', // Use 'oxide-dark' if you want to force dark mode, or dynamic logic
          // Make it blend with Shadcn UI (Optional: customizing skin is complex, sticking to default clean look)
        }}
      />
    </div>
  );
};

export default RichTextEditor;
