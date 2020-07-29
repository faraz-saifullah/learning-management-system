# learning-management-system

This application is a simple Learning Management System created to cater the needs of Teachers and Students for Online Learning.

In this application Teachers can Create Classrooms and add students to it.

From the Dashboard every student and teacher is able to access all of his/her classes and class overviews.

Teachers have the option of updating classroom info, adding useful resources and adding students to the classroom using Student Mobile Number.

The application is hosted on AWS EC2:

http://ec2-3-136-87-139.us-east-2.compute.amazonaws.com:3000/

You can Login using The Phone Numbers and OTPs provided in the phone_numbers.pdf file.

To run the application locally please follow the below Steps:

    1. Pre-requisits

        a. Node
        b. npm
        c. Postgres
    
    2. Steps to run the project locally

        a. Clone the repository and checkout the master branch
        b. The project has three parts 1. Frontend 2. Backend 3. Database
        c. Create a postgres database named `lms` and a role named `postgres` with password `Pass@123`
        d. Use the lms.sql file to restore the database into your local postgres database (lms)
        e. Checkout to the learning-management-system/backend direactory and run the following commands

            `npm install`
            `npm start`

        f. Open a new Terminal
        g. Checkout to the learning-management-system/frontend direactory and run the following commands

            `npm install`
            `npm start`
        
        h. You can access the application now at

            `localhost:3000`
