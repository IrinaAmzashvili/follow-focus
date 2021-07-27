from app.models import db, Level


def seed_levels():
    level_all = Level(level_type='All Levels')
    level_1 = Level(level_type='Beginner')
    level_2 = Level(level_type='Intermediate')
    level_3 = Level(level_type='Advanced')

    all_levels = [level_all, level_1, level_2, level_3]

    db.session.add_all(all_levels)
    db.session.commit()


def undo_levels():
    db.session.execute('TRUNCATE levels RESTART IDENTITY CASCADE;')
    db.session.commit()
