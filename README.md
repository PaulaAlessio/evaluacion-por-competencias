# Flask Student Management Application

This is a web application built with **Flask** for managing student assignments, events, and groups. It allows you to perform various actions like importing student data, creating and managing assignments, and viewing and editing event records. The application also supports exporting filtered data to a CSV and PDF format.

## Features

- **Student Management**
  - Upload a list of students from a CSV file.
  - View and manage student records, including their associated groups.
  
- **Assignment Management**
  - View and manage assignments, with the ability to add, edit, and delete assignments.

- **Event Management**
  - View event records associated with students and assignments.
  - Edit competency values for each student in relation to a specific assignment.
  - Filter and export event data to CSV and PDF formats.
  
- **Group Management**
  - Manage student groups and link students to specific groups.

## Prerequisites

Before running the project, make sure you have the following installed:

- **Python 3.x**
- **Flask** (web framework for Python)
- **SQLite** (database for storing application data)

### Install Flask and Other Dependencies

To install the required Python dependencies, create a virtual environment and install the dependencies using `pip`.

```bash
# Create a virtual environment
python3 -m venv venv

# Activate the virtual environment
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

# Install the dependencies
pip install flask pandas
```
## Project Structure

Here is an overview of the project structure:
```
/your_project/
    /static/
        /js/
            events.js              # JavaScript file for event management
    /templates/
        index.html                # Index page template
        events.html               # Events page template
    app.py                        # Main Flask application
    /uploads/                     # Directory for uploaded CSV files
    /instance/                    # SQLite database
    README.md                     # Project README
```

## Database Model

This project uses **SQLite** to store the following tables:

- **Student**: Stores student information (name, ID, group).
  - Columns: `id`, `name`, `group_id`
  
- **Group**: Stores group information (name, ID).
  - Columns: `id`, `name`

- **Assignment**: Stores assignment details (exercise number, tag).
  - Columns: `id`, `exercise_number`, `assignment_tag`
  
- **Event**: Stores student assignment events, including competency values (CE1, CE2, ..., CE10).
  - Columns: `id`, `id_student`, `id_assignment`, `CE1`, `CE2`, ..., `CE10`

### Example Model Code

Here is the structure of the models in `app.py` using SQLAlchemy:

```python
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Student(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('group.id'))
    group = db.relationship('Group', backref=db.backref('students', lazy=True))

class Group(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

class Assignment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    exercise_number = db.Column(db.Integer, nullable=False)
    assignment_tag = db.Column(db.String(100), nullable=False)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_student = db.Column(db.Integer, db.ForeignKey('student.id'), nullable=False)
    id_assignment = db.Column(db.Integer, db.ForeignKey('assignment.id'), nullable=False)
    CE1 = db.Column(db.Float)
    CE2 = db.Column(db.Float)
    CE3 = db.Column(db.Float)
    CE4 = db.Column(db.Float)
    CE5 = db.Column(db.Float)
    CE6 = db.Column(db.Float)
    CE7 = db.Column(db.Float)
    CE8 = db.Column(db.Float)
    CE9 = db.Column(db.Float)
    CE10 = db.Column(db.Float)
```
Apologies for the formatting issue! Below is the corrected README.md starting from the Database Setup section, formatted properly for Markdown.

## Database Setup

The database will be created automatically when the application runs for the first time. To ensure the database is set up, you can run the `create_all()` method in `app.py`.

```python
from app import db
db.create_all()

This will create the necessary tables in the SQLite database.
```

# Running the Application

To run the application locally, use the following steps:

1. Make sure you have activated your virtual environment.
2. Run the Flask app using the following command:

```bash
python app.py
```

3. The app will be available at http://127.0.0.1:5000/ in your browser.
   
### Available Routes

- **`/`** - Displays the main student list and management interface.
- **`/events`** - Displays the event management interface, where you can edit event data and view assignment details.
- **`/delete_student/<student_id>`** - Deletes a student from the database.
- **`/delete_event/<event_id>`** - Deletes an event record.
- **`/filter_by_form`** - Filters the event data based on selected student or assignment.
- **`/export_csv`** - Exports filtered event data to a CSV file.
- **`/export_pdf`** - Exports filtered event data to a PDF file.

## JavaScript Integration

The application contains **JavaScript** code to handle dynamic operations such as:

- Editable table cells for events (competencies).
- Toggle visibility of rows based on checkboxes.
- Export filtered data to CSV or PDF formats.

The JavaScript file is located in the `static/js/` folder and is dynamically linked using Flask’s `url_for()` function.

### Exporting Data to CSV

You can export filtered student or event data to a CSV file by clicking the **Export to CSV** button after applying your desired filters.

### Exporting Data to PDF

The application also supports exporting event data to a **PDF** file using the **Export to PDF** button. This feature is powered by the **jsPDF** library on the frontend.

## Customizing the Application

The application is easily extendable. You can add more tables or routes to meet your requirements. For example:

- Add additional fields to the **Event** table (e.g., new competencies).
- Implement additional views for student or assignment details.
- Add user authentication or roles for better security.

## Troubleshooting

- **404 Errors for Static Files**: If the static JavaScript or CSS files are not loading, ensure they are placed in the correct `static` directory and correctly linked in the HTML templates.
- **Database Issues**: If you encounter issues with the database, try dropping the existing SQLite file and running `db.create_all()` again to recreate the tables.
- **File Upload Errors**: Ensure that the uploaded files are in the correct CSV format and are being processed correctly on the backend.

## Contributing

If you'd like to contribute to this project, feel free to open an issue or submit a pull request. All contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


   
