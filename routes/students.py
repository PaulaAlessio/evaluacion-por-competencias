import csv
from flask import Blueprint, render_template, request, redirect, url_for
from models import db, Student, Group

students_bp = Blueprint('students', __name__)


@students_bp.route('/students')
def students():
    all_students = Student.query.all()
    all_groups = Group.query.all()
    return render_template('students.html', students=all_students, groups=all_groups)


@students_bp.route('/upload_students', methods=['POST'])
def upload_students():
    file = request.files['file']
    if file:
        csv_data = csv.reader(file.read().decode('utf-8').splitlines())
        for row in csv_data:
            if len(row) >= 2:  # Ensure there are enough columns
                name, group_name = row[:2]
                # Check if the group already exists
                group = Group.query.filter_by(name=group_name).first()
                if not group:
                    # Insert the new group
                    group = Group(name=group_name)
                    db.session.add(group)
                    db.session.commit()  # Commit to generate the group.id
                new_student = Student(name=name, id_group=group.id)
                db.session.add(new_student)
        db.session.commit()
    return redirect(url_for('students.students'))


@students_bp.route('/delete_student/<int:id>', methods=['POST'])
def delete_student(id):
    student = Student.query.get(id)
    if student:
        db.session.delete(student)
        db.session.commit()
    return redirect(url_for('students.students'))
