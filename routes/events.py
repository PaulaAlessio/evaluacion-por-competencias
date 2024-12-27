from flask import Blueprint, render_template, request, url_for, redirect

from models import db, Event, Assignment, Student, Group

events_bp = Blueprint('events', __name__)


@events_bp.route('/events')
def events():
  all_events = Event.query.all()
  all_assignments = Assignment.query.all()
  all_students = Student.query.all()
  all_groups = Group.query.all()
  return render_template('events.html', events=all_events,
                         assignments=all_assignments,
                         students=all_students,
                         groups=all_groups,
                         assignment_id='', group_id='', student_id='')


@events_bp.route('/filter_by_form', methods=['GET'])
def filter_by_form():
  student_id = request.args.get('student_id')  # Get the dropdown value
  assignment_id = request.args.get('assignment_id')  # Get the dropdown value
  group_id = request.args.get('group_id')  # Get the dropdown value
  print("suca", assignment_id, student_id)
  _events = Event.query.all()
  if not student_id and assignment_id:  # Dropdown left unselected
    if group_id:
      _events = Event.query.filter_by(id_assignment=assignment_id, id_group=group_id).all()
    else:
      _events = Event.query.filter_by(id_assignment=assignment_id).all()
  elif not assignment_id and student_id:
    _events = Event.query.filter_by(id_student=student_id).all()
  elif assignment_id and student_id:
    _events = Event.query.filter_by(id_student=student_id, id_assignment=assignment_id).all()
  return render_template('events.html', events=_events,
                         assignments=Assignment.query.all(), students=Student.query.all(),
                         groups=Group.query.all(),
                         assignment_id=assignment_id, group_id=group_id, student_id=student_id)


@events_bp.route('/create_events', methods=['GET'])
def create_events():
  student_id = request.args.get('student_id')  # Get the dropdown value
  assignment_id = request.args.get('assignment_id')  # Get the dropdown value
  group_id = request.args.get('group_id')  # Get the dropdown value
  print("suca", "assignment: ", assignment_id, "student: ", student_id, "group: ", group_id)
  _events = Event.query.all()
  if assignment_id and not student_id:  # Dropdown left unselected
    if group_id:
      existing_event = Event.query.filter_by(id_assignment=assignment_id, id_group=group_id).first()
    else:
      existing_event = Event.query.filter_by(id_assignment=assignment_id).first()
    if not existing_event:
      students = Student.query.all()
      for student in students:
        new_event = Event(id_student=student.id, id_assignment=assignment_id, id_group=student.id_group,
                          CE1=None, CE2=None, CE3=None,
                          CE4=None, CE5=None, CE6=None, CE7=None, CE8=None, CE9=None, CE10=None)
        if (group_id and int(group_id) == int(student.id_group)) or not group_id:
          db.session.add(new_event)
      db.session.commit()
  return filter_by_form()



@events_bp.route('/delete_event/<int:id>', methods=['POST'])
def delete_event(id):
  event = Event.query.get(id)
  if event:
    db.session.delete(event)
    db.session.commit()
  return redirect(url_for('events.events'))


@events_bp.route('/update_event', methods=['GET'])
def update_event():
  # Get the URL arguments (query params)
  event_id = request.args.get('event_id')
  column = request.args.get('column')
  value = request.args.get('value')
  print("updating id ", event_id, "column ", column, "value ", value)
  # Convert the value to a float (for CE1, CE2, ..., CE10)
  try:
    value = float(value)
  except ValueError:
    return "Invalid value", 400  # Bad request if value is not a valid float
  # Fetch the event from the database
  event = Event.query.get(event_id)
  if not event:
    return "Event not found", 404
  # Update the specified column dynamically
  if hasattr(event, column):
    setattr(event, column, value)
  else:
    return f"Column {column} does not exist", 400

  db.session.commit()
  return "Event updated successfully"
