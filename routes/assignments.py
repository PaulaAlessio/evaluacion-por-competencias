import csv
from flask import Blueprint, render_template, request, redirect, url_for
from models import db, Assignment

assignments_bp = Blueprint('assignments', __name__)


@assignments_bp.route('/assignments')
def assignments():
    all_assignments = Assignment.query.all()
    return render_template('assignments.html', assignments=all_assignments)


@assignments_bp.route('/add_assignment', methods=['POST'])
def add_assignment():
    exercise_number = request.form['exercise_number']
    assignment_tag = request.form['assignment_tag']
    new_assignment = Assignment(exercise_number=exercise_number, assignment_tag=assignment_tag)
    db.session.add(new_assignment)
    db.session.commit()
    return redirect(url_for('assignments.assignments'))


@assignments_bp.route('/delete_assignment/<int:id>', methods=['POST'])
def delete_assignment(id):
    assignment = Assignment.query.get(id)
    if assignment:
        db.session.delete(assignment)
        db.session.commit()
    return redirect(url_for('assignments.assignments'))
