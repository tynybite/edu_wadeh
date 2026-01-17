// MINIMAL TEST SCRIPT
// 1. Create new Google Sheet
// 2. Extensions > Apps Script
// 3. Delete everything in Code.gs
// 4. Paste this code
// 5. Save (Ctrl+S)
// 6. Click Run > helloTest
// 7. Authorize when prompted
// 8. Check the execution log

function helloTest() {
  Logger.log("Hello! Script is working!");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss) {
    Logger.log("Spreadsheet name: " + ss.getName());
    Logger.log("Spreadsheet URL: " + ss.getUrl());
  } else {
    Logger.log("ERROR: No spreadsheet connected");
  }
  
  Logger.log("Test complete!");
}

function createApplicationsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (!ss) {
    Logger.log("No spreadsheet!");
    return;
  }
  
  // Delete existing Applications sheet if it exists
  var existingSheet = ss.getSheetByName("Applications");
  if (existingSheet) {
    ss.deleteSheet(existingSheet);
    Logger.log("Deleted old Applications sheet");
  }
  
  // Create fresh sheet
  var sheet = ss.insertSheet("Applications");
  
  // Add headers
  sheet.getRange("A1:I1").setValues([[
    "Date", "Name", "Email", "Phone", "Course", "Institution", "Payment ID", "Amount", "Files"
  ]]);
  
  // Format headers
  sheet.getRange("A1:I1").setFontWeight("bold");
  sheet.getRange("A1:I1").setBackground("#1a4d3e");
  sheet.getRange("A1:I1").setFontColor("white");
  
  Logger.log("Applications sheet created!");
  Logger.log("Done!");
}

function testAddRow() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Applications");
  
  if (!sheet) {
    Logger.log("Applications sheet not found! Run createApplicationsSheet first.");
    return;
  }
  
  sheet.appendRow([
    new Date(),
    "Test User",
    "test@example.com", 
    "9876543210",
    "bems",
    "Wadeh Medical College",
    "pay_test123",
    500,
    "No files"
  ]);
  
  Logger.log("Test row added!");
}

function testEmail() {
  var yourEmail = "CHANGE_THIS@gmail.com"; // PUT YOUR EMAIL HERE
  
  Logger.log("Sending email to: " + yourEmail);
  
  try {
    MailApp.sendEmail(yourEmail, "Test from Wadeh Script", "Email is working! Time: " + new Date());
    Logger.log("Email sent successfully!");
  } catch(e) {
    Logger.log("Email failed: " + e);
  }
}

function checkQuota() {
  var quota = MailApp.getRemainingDailyQuota();
  Logger.log("Email quota remaining: " + quota);
}
