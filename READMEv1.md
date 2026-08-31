How to Create a New GitHub Repository

Follow these steps to create and upload a new project to GitHub.

1. Create a Repository on GitHub

1. Open GitHub.
2. Click the + icon in the top-right corner.
3. Select New repository.
4. Enter the repository name.
5. Add a description if required.
6. Select Public or Private.
7. Click Create repository.

2. Create a Local Project

Open your terminal and create a project folder:

mkdir my-project
cd my-project

Initialize Git:

git init

3. Add Your Project Files

Create or copy your project files into the folder.

Example:

my-project/
├── app.js
├── package.json
├── README.md
└── src/

4. Add Files to Git

git add .

5. Create the First Commit

git commit -m "Initial commit"

6. Connect the Local Project to GitHub

Copy the repository URL from GitHub and run:

git remote add origin https://github.com/USERNAME/REPOSITORY.git

Example:

git remote add origin https://github.com/keshavsoft/my-project.git

7. Push the Project to GitHub

Rename the default branch to "main":

git branch -M main

Push the code:

git push -u origin main

8. Verify the Repository

Refresh your GitHub repository page.

You should now see your project files, including:

- "README.md"
- Source code
- "package.json"
- Other project files

Complete Command Flow

mkdir my-project
cd my-project

git init

git add .

git commit -m "Initial commit"

git branch -M main

git remote add origin https://github.com/USERNAME/REPOSITORY.git

git push -u origin main

Updating the Repository

Whenever you make changes:

git add .
git commit -m "Updated project"
git push

That's it. Your local project is now connected to GitHub and can be updated using the normal add → commit → push workflow.