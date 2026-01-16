// Google Apps Script Code
// 1. Create a NEW Google Sheet (sheets.new)
// 2. Name it "Wadeh Applications" (or anything you like)
// 3. Go to Extensions > Apps Script
// 4. Paste this code into Code.gs (delete existing code)
// 5. Run the 'setup' function once to create the sheet headers (It will ask for permissions)
// 6. Click "Deploy" > "New deployment"
// 7. Select type: "Web app"
// 8. Description: "Apply Form API"
// 9. Execute as: "Me"
// 10. Who has access: "Anyone" (IMPORTANT)
// 11. Copy the Web App URL and paste it into Apply.tsx

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Save Files to Drive
    let fileUrls = [];
    
    // Handle multiple files if sent as 'files' array
    if (data.files && Array.isArray(data.files)) {
      const folderName = "Wadeh Applications";
      const folder = getOrCreateFolder(folderName);
      
      data.files.forEach(fileData => {
        if (fileData.data && fileData.name) {
          const contentType = fileData.type || "application/pdf";
          const blob = Utilities.newBlob(Utilities.base64Decode(fileData.data), contentType, fileData.name);
          const file = folder.createFile(blob);
          file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
          fileUrls.push(fileData.fieldName + ": " + file.getUrl());
        }
      });
    } 
    // Fallback for single file (backward compatibility)
    else if (data.fileData && data.fileName) {
      const folderName = "Wadeh Applications";
      const folder = getOrCreateFolder(folderName);
      const contentType = data.fileType || "application/pdf";
      const blob = Utilities.newBlob(Utilities.base64Decode(data.fileData), contentType, data.fileName);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      fileUrls.push(file.getUrl());
    }

    // 2. Save Data to Spreadsheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName("Applications");
    if (!sheet) {
      sheet = ss.insertSheet("Applications");
      // Add Headers
      sheet.appendRow(["Date", "Name", "Email", "Phone", "Course", "Institution", "Files"]);
    }

    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.phone,
      data.course,
      data.institution,
      fileUrls.join("\n")
    ]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", message: "Application submitted" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder(folderName) {
  const folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return DriveApp.createFolder(folderName);
  }
}

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Applications");
  if (!sheet) {
    sheet = ss.insertSheet("Applications");
    sheet.appendRow(["Date", "Name", "Email", "Phone", "Course", "Institution", "Files"]);
  }
}
