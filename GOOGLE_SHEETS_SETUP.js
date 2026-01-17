// Google Apps Script Code - Wadeh Medical College Applications
// ============================================================
// SETUP: 
// 1. Create new Google Sheet > Extensions > Apps Script
// 2. Paste this code > Save > Run 'setup'
// 3. Deploy as Web App (Execute as: Me, Access: Anyone)
// 4. Copy Web App URL to Apply.tsx

// =============================================
// CONFIGURATION
// =============================================
var ADMISSIONS_EMAIL = ""; // Add email like "admissions@wadeh.in" to CC
var FROM_NAME = "Wadeh Medical College & Hospital";

// =============================================
// MAIN HANDLER
// =============================================
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var fileUrls = [];
    
    // Save files to Drive
    if (data.files && Array.isArray(data.files)) {
      var folder = getOrCreateFolder("Wadeh Applications");
      data.files.forEach(function(fileData) {
        if (fileData.data && fileData.name) {
          var blob = Utilities.newBlob(Utilities.base64Decode(fileData.data), fileData.type || "application/pdf", fileData.name);
          var file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fileUrls.push(fileData.fieldName + ": " + file.getUrl());
        }
      });
    }

    // Save to spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Applications");
    if (!sheet) {
      sheet = ss.insertSheet("Applications");
      sheet.appendRow(["Date", "Name", "Email", "Phone", "Course", "Institution", "Payment ID", "Amount", "Files"]);
    }

    var applicationDate = new Date();
    var applicationId = generateApplicationId();

    sheet.appendRow([
      applicationDate,
      data.name,
      data.email,
      data.phone,
      data.course,
      data.institution,
      data.paymentId || "N/A",
      data.applicationFee || "N/A",
      fileUrls.join("\n")
    ]);

    // Send confirmation email
    sendConfirmationEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      course: data.course,
      paymentId: data.paymentId,
      applicationFee: data.applicationFee,
      applicationId: applicationId,
      applicationDate: applicationDate
    });

    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      applicationId: applicationId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error: " + error);
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function generateApplicationId() {
  var ts = new Date().getTime().toString(36).toUpperCase();
  var rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return "WMCH-" + ts.slice(-4) + rand;
}

// =============================================
// PREMIUM EMAIL TEMPLATE
// =============================================
function sendConfirmationEmail(data) {
  var courseName = getCourseFullName(data.course);
  var formattedDate = Utilities.formatDate(data.applicationDate, "Asia/Kolkata", "dd MMMM yyyy 'at' hh:mm a");
  var year = new Date().getFullYear();
  var amount = data.applicationFee || 500;
  
  var subject = "Welcome to WMCH! Application #" + data.applicationId + " Confirmed";
  
  // PREMIUM HTML EMAIL
  var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
    '<body style="margin:0;padding:0;background:#f4f1eb;font-family:Georgia,serif;">' +
    
    // Container
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:40px 20px;">' +
    '<tr><td align="center">' +
    '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">' +
    
    // Gradient Top Bar
    '<tr><td style="height:6px;background:linear-gradient(90deg,#1a4d3e 0%,#2d6a4f 50%,#d4a34a 100%);"></td></tr>' +
    
    // Header
    '<tr><td style="padding:48px 40px 32px;text-align:center;background:#faf9f7;">' +
    '<div style="width:72px;height:72px;margin:0 auto 20px;background:linear-gradient(135deg,#1a4d3e,#2d6a4f);border-radius:18px;line-height:72px;">' +
    '<span style="font-size:32px;color:#fff;font-weight:bold;">W</span>' +
    '</div>' +
    '<h1 style="margin:0 0 6px;font-size:26px;font-weight:400;color:#1a4d3e;letter-spacing:-0.5px;">Wadeh Medical College</h1>' +
    '<p style="margin:0;font-size:12px;color:#9ca3af;font-family:Arial,sans-serif;text-transform:uppercase;letter-spacing:3px;">& Hospital</p>' +
    '</td></tr>' +
    
    // Success Banner
    '<tr><td style="padding:0 40px;">' +
    '<div style="background:linear-gradient(135deg,#d4a34a,#c49339);border-radius:12px;padding:28px;text-align:center;margin-top:-12px;box-shadow:0 8px 24px rgba(212,163,74,0.3);">' +
    '<div style="width:56px;height:56px;margin:0 auto 12px;background:rgba(255,255,255,0.2);border-radius:50%;line-height:56px;font-size:28px;">✓</div>' +
    '<h2 style="margin:0;font-size:18px;color:#fff;font-weight:600;font-family:Arial,sans-serif;">Application Received Successfully</h2>' +
    '</div>' +
    '</td></tr>' +
    
    // Welcome Text
    '<tr><td style="padding:36px 40px 20px;">' +
    '<p style="font-size:17px;color:#1a4d3e;margin:0 0 14px;font-weight:600;">Dear ' + data.name + ',</p>' +
    '<p style="font-size:15px;line-height:1.8;color:#4b5563;margin:0;font-family:Arial,sans-serif;">' +
    'Thank you for choosing <strong style="color:#1a4d3e;">Wadeh Medical College & Hospital</strong>. We are delighted to confirm your application and payment have been processed successfully.' +
    '</p>' +
    '</td></tr>' +
    
    // Application Card
    '<tr><td style="padding:16px 40px;">' +
    '<div style="border:2px solid #e5e7eb;border-radius:12px;overflow:hidden;">' +
    '<div style="background:#faf9f7;padding:14px 20px;border-bottom:1px solid #e5e7eb;">' +
    '<p style="margin:0;font-size:11px;font-family:Arial,sans-serif;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">📋 Application Details</p>' +
    '</div>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;">' +
    '<tr><td style="padding:14px 20px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Application ID</td><td style="padding:14px 20px;color:#1a4d3e;font-weight:700;font-family:Monaco,monospace;font-size:13px;border-bottom:1px solid #f3f4f6;">' + data.applicationId + '</td></tr>' +
    '<tr><td style="padding:14px 20px;color:#6b7280;border-bottom:1px solid #f3f4f6;">Program</td><td style="padding:14px 20px;color:#1a4d3e;font-weight:600;border-bottom:1px solid #f3f4f6;">' + courseName + '</td></tr>' +
    '<tr><td style="padding:14px 20px;color:#6b7280;">Submitted</td><td style="padding:14px 20px;color:#374151;">' + formattedDate + '</td></tr>' +
    '</table>' +
    '</div>' +
    '</td></tr>' +
    
    // Payment Card
    '<tr><td style="padding:16px 40px;">' +
    '<div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border-radius:12px;padding:24px;border:1px solid #a7f3d0;">' +
    '<p style="margin:0 0 16px;font-size:11px;font-family:Arial,sans-serif;color:#047857;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;">💳 Payment Confirmed</p>' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;">' +
    '<tr><td style="padding:6px 0;color:#047857;font-size:14px;">Amount Paid</td><td style="padding:6px 0;text-align:right;color:#047857;font-weight:700;font-size:26px;">₹' + amount + '</td></tr>' +
    '<tr><td style="padding:6px 0;color:#6b7280;font-size:12px;">Transaction ID</td><td style="padding:6px 0;text-align:right;color:#374151;font-family:Monaco,monospace;font-size:11px;">' + data.paymentId + '</td></tr>' +
    '</table>' +
    '</div>' +
    '</td></tr>' +
    
    // What's Next
    '<tr><td style="padding:16px 40px;">' +
    '<div style="background:#fffbeb;border-radius:12px;padding:24px;border:1px dashed #d4a34a;">' +
    '<p style="margin:0 0 14px;font-size:15px;color:#1a4d3e;font-weight:600;">🚀 What Happens Next?</p>' +
    '<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:13px;color:#4b5563;line-height:1.7;">' +
    '<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#d4a34a;font-weight:bold;">1.</td><td style="padding:6px 0;">Document review by admissions team (24-48 hours)</td></tr>' +
    '<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#d4a34a;font-weight:bold;">2.</td><td style="padding:6px 0;">Interview scheduling call from our counselor</td></tr>' +
    '<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#d4a34a;font-weight:bold;">3.</td><td style="padding:6px 0;">Admission offer letter upon verification</td></tr>' +
    '<tr><td style="padding:6px 12px 6px 0;vertical-align:top;color:#d4a34a;font-weight:bold;">4.</td><td style="padding:6px 0;">Fee payment to confirm your seat</td></tr>' +
    '</table>' +
    '</div>' +
    '</td></tr>' +
    
    // Contact
    '<tr><td style="padding:28px 40px;">' +
    '<p style="font-size:13px;color:#6b7280;margin:0 0 12px;font-family:Arial,sans-serif;">Questions? We are here to help:</p>' +
    '<p style="margin:0;">' +
    '<a href="mailto:admissions@wadeh.in" style="font-family:Arial,sans-serif;font-size:13px;color:#d4a34a;text-decoration:none;font-weight:600;margin-right:20px;">📧 admissions@wadeh.in</a>' +
    '<a href="tel:+919876543210" style="font-family:Arial,sans-serif;font-size:13px;color:#d4a34a;text-decoration:none;font-weight:600;">📞 +91 98765 43210</a>' +
    '</p>' +
    '</td></tr>' +
    
    // Footer
    '<tr><td style="background:#1a4d3e;padding:32px 40px;text-align:center;">' +
    '<p style="margin:0 0 6px;font-size:15px;color:#fff;font-weight:600;">Wadeh Medical College & Hospital</p>' +
    '<p style="margin:0 0 20px;font-size:11px;color:rgba(255,255,255,0.5);font-family:Arial,sans-serif;font-style:italic;">"Best for your future — A new system revolution!"</p>' +
    '<div style="border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;">' +
    '<a href="https://edu.wadeh.in" style="color:#d4a34a;text-decoration:none;font-size:11px;margin:0 10px;font-family:Arial,sans-serif;">Website</a>' +
    '<span style="color:rgba(255,255,255,0.2);">•</span>' +
    '<a href="https://edu.wadeh.in/courses" style="color:#d4a34a;text-decoration:none;font-size:11px;margin:0 10px;font-family:Arial,sans-serif;">Programs</a>' +
    '<span style="color:rgba(255,255,255,0.2);">•</span>' +
    '<a href="https://edu.wadeh.in/help" style="color:#d4a34a;text-decoration:none;font-size:11px;margin:0 10px;font-family:Arial,sans-serif;">Help</a>' +
    '</div>' +
    '<p style="margin:20px 0 0;font-size:10px;color:rgba(255,255,255,0.3);font-family:Arial,sans-serif;">© ' + year + ' Wadeh Medical College & Hospital</p>' +
    '</td></tr>' +
    
    '</table></td></tr></table></body></html>';
  
  // Plain text version
  var plainText = 
    "APPLICATION CONFIRMATION - " + data.applicationId + "\n" +
    "==========================================\n\n" +
    "Dear " + data.name + ",\n\n" +
    "Thank you for applying to Wadeh Medical College & Hospital!\n\n" +
    "APPLICATION DETAILS\n" +
    "-------------------\n" +
    "Application ID: " + data.applicationId + "\n" +
    "Program: " + courseName + "\n" +
    "Submitted: " + formattedDate + "\n\n" +
    "PAYMENT CONFIRMED\n" +
    "-----------------\n" +
    "Amount: Rs. " + amount + "\n" +
    "Transaction ID: " + data.paymentId + "\n\n" +
    "NEXT STEPS\n" +
    "----------\n" +
    "1. Document review (24-48 hours)\n" +
    "2. Interview scheduling call\n" +
    "3. Admission offer letter\n" +
    "4. Fee payment to confirm seat\n\n" +
    "Contact: admissions@wadeh.in | +91 98765 43210\n\n" +
    "---\n" +
    "Wadeh Medical College & Hospital\n" +
    "https://edu.wadeh.in";
  
  // Send email
  var options = {
    to: data.email,
    subject: subject,
    body: plainText,
    htmlBody: html,
    name: FROM_NAME
  };
  
  if (ADMISSIONS_EMAIL && ADMISSIONS_EMAIL.length > 0) {
    options.cc = ADMISSIONS_EMAIL;
  }
  
  MailApp.sendEmail(options);
  Logger.log("Email sent to: " + data.email);
}

function getCourseFullName(id) {
  var c = {
    "bems": "B.E.M.S. - Bachelor of Electro-Homeopathy Medicine & Surgery",
    "md": "M.D. - Master of Electro-Homeopathy Medicine",
    "phd": "Ph.D. - Doctor of Philosophy",
    "dems": "D.E.M.S. - Diploma in Electro-Homeopathy",
    "cems": "C.E.M.S. - Certificate in Electro-Homeopathy"
  };
  return c[id] || id;
}

function getOrCreateFolder(name) {
  var folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(name);
}

// =============================================
// SETUP & TEST FUNCTIONS
// =============================================
function setup() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) { Logger.log("No spreadsheet!"); return; }
  
  var sheet = ss.getSheetByName("Applications");
  if (sheet) {
    sheet.getRange(1, 1, 1, 9).setValues([["Date", "Name", "Email", "Phone", "Course", "Institution", "Payment ID", "Amount", "Files"]]);
    Logger.log("Headers updated");
  } else {
    sheet = ss.insertSheet("Applications");
    sheet.appendRow(["Date", "Name", "Email", "Phone", "Course", "Institution", "Payment ID", "Amount", "Files"]);
    Logger.log("New sheet created");
  }
  
  sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#1a4d3e").setFontColor("white");
  for (var i = 1; i <= 9; i++) sheet.autoResizeColumn(i);
  Logger.log("Setup complete!");
}

function testEmail() {
  var yourEmail = "YOUR_EMAIL@gmail.com"; // CHANGE THIS
  
  sendConfirmationEmail({
    name: "Test Student",
    email: yourEmail,
    phone: "9876543210",
    course: "bems",
    paymentId: "pay_TEST" + Date.now(),
    applicationFee: 500,
    applicationId: "WMCH-TEST1234",
    applicationDate: new Date()
  });
  
  Logger.log("Test email sent to: " + yourEmail);
}

function checkQuota() {
  Logger.log("Email quota: " + MailApp.getRemainingDailyQuota());
}
