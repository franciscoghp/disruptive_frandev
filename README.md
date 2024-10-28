# Disruptive Content Manager

**Author**: Francisco Herrera

This project is a multimedia content management application that enables administrators and users to manage and view content based on user roles. The app includes a role-based permission system, allowing for the structured management of categories, topics, and content access permissions.

## Project Description

The application allows administrators to create content categories (such as images, YouTube videos, and text documents) and associate these with various topics (like science, math, sports). Each topic can have specific permissions, and users are classified into three main roles:

- **Administrator**: Full CRUD (Create, Read, Update, Delete) access to manage categories, topics, and permissions.
- **Creator**: Can create and update content within the assigned topics.
- **Reader**: Can view authorized content based on topic permissions.

The content library is organized by type and topic, with search capabilities for both topics and content names. Additionally, only registered users are granted access to multimedia content.

## Key Features

- **Category and Topic Management**: Administrators can create and assign permissions to content categories and topics.
- **User Roles and Permissions**:
  - **Administrator**: Full CRUD capabilities for managing content and users.
  - **Creator**: Can add and update content within authorized topics.
  - **Reader**: Read-only access to authorized content.
- **Library and Search Functionality**: The content library can be searched by topic or content name, and new entries are organized by creation date.

## Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/franciscoghp/disruptive_frandev.git
cd disruptive_frandev


### Step 1: Clone the Repository

```bash
git clone https://github.com/franciscoghp/disruptive_frandev.git
cd disruptive_frandev
```

### Step 2: Install Dependencies

```bash
$ npm install
```

### Step 3: Configure Environment Variables

Create a .env file in the root of the project and add the necessary environment variables. Here is an example:

```bash
MONGO_URI='mongodb+srv://francisco9mil:EKsmxqWK65HD7Vts@cluster-virtual-wallet.zil3i.mongodb.net/'
JWT_SECRET='secretTokenKey'
```


### Step 4: Run the Project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

### Step 8: Running Tests

To run the tests, use the following command:

```bash
# test coverage
$ npm run test

```