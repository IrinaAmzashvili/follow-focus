from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='User', username='Demolevato',
        email='demo@aa.io', password='password', email_updates=True,
        super_user=False, tier_id=4)
    super_demo = User(
        first_name='Super', last_name='Demo', username='SuperDemo',
        email='superdemo@aa.io', password='password', email_updates=True,
        super_user=True, tier_id=4)
    user_1 = User(
        first_name='Steve', last_name='Rogers', username='Cap',
        email='cap@avengers.io', password='password', email_updates=False,
        super_user=False, tier_id=1)
    user_2 = User(
        first_name='Bucky', last_name='Barnes', username='WinterSoldier',
        email='wintersoldier@avengers.io', password='password',
        email_updates=False, super_user=False, tier_id=2)
    user_3 = User(
        first_name='Thor', last_name='Odinson', username='Thor',
        email='pointbreak@avengers.io', password='password',
        email_updates=False, super_user=False, tier_id=3)
    user_4 = User(
        first_name='Loki', last_name='Laufeyson', username='Loki',
        email='loki@avengers.io', password='password', email_updates=False,
        super_user=False, tier_id=4)
    user_5 = User(
        first_name='Wanda', last_name='Maximoff', username='ScarletWitch',
        email='scarletwitch@avengers.io', password='password',
        email_updates=False, super_user=False, tier_id=1)
    user_6 = User(
        first_name='Natasha', last_name='Romanoff', username='BlackWidow',
        email='blackwidow@avengers.io', password='password',
        email_updates=False, super_user=False, tier_id=2)
    user_7 = User(
        first_name='Sam', last_name='Wilson', username='CaptainAmerica',
        email='captainamerica@avengers.io', password='password',
        email_updates=False, super_user=False, tier_id=3)

    all_users = [demo, super_demo, user_1, user_2, user_3, user_4, user_5,
                 user_6, user_7]

    db.session.add_all(all_users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
