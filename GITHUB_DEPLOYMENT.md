# GitHub Deployment Instructions

This document provides detailed instructions for deploying the TensorFlow.js Text Reader application to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your local machine
- The TensorFlow.js Text Reader application files

## Step 1: Create a GitHub Repository

1. Log in to your GitHub account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "tensorflow-text-reader")
4. Add a description (optional)
5. Choose whether to make the repository public or private
6. Click "Create repository"

## Step 2: Upload Files to GitHub

### Option 1: Upload via Web Interface (Simplest)

1. Navigate to your newly created repository
2. Click the "Add file" button and select "Upload files"
3. Drag and drop all the application files (all files should be in the root directory, not in subfolders)
4. Add a commit message (e.g., "Initial upload of TensorFlow.js Text Reader")
5. Click "Commit changes"

### Option 2: Using Git Command Line

1. Open a terminal or command prompt
2. Navigate to your project directory:
   ```
   cd path/to/tensorflow-text-reader-flat
   ```
3. Initialize a Git repository:
   ```
   git init
   ```
4. Add all files to the repository:
   ```
   git add .
   ```
5. Commit the files:
   ```
   git commit -m "Initial commit"
   ```
6. Add the remote GitHub repository:
   ```
   git remote add origin https://github.com/your-username/tensorflow-text-reader.git
   ```
   (Replace "your-username" with your actual GitHub username)
7. Push your code to GitHub:
   ```
   git push -u origin main
   ```
   (If you're using an older version of Git, you might need to use `master` instead of `main`)

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select the branch you want to deploy (usually "main")
5. Click "Save"
6. After a few moments, your site will be published and you'll see a message with the URL

## Step 4: Access Your Deployed Application

1. Your application will be available at:
   ```
   https://your-username.github.io/tensorflow-text-reader/
   ```
   (Replace "your-username" with your actual GitHub username)
2. It may take a few minutes for your site to be fully deployed

## Updating Your Application

When you make changes to your application:

1. If using the web interface, simply upload the updated files
2. If using Git:
   ```
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Your GitHub Pages site will automatically update with the new changes

## Troubleshooting

- If your site doesn't appear, check that you've selected the correct branch in the GitHub Pages settings
- Ensure that your `index.html` file is in the root directory of your repository
- Check the GitHub Pages section in Settings for any error messages
- If you see a 404 error, make sure all file paths in your HTML, CSS, and JavaScript files are correct

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Git Documentation](https://git-scm.com/doc)
- [Markdown Guide](https://www.markdownguide.org/) for editing README files
