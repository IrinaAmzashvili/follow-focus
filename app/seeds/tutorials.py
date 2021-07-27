from app.models import db, Tutorial


def seed_tutorials():
    vid_1 = Tutorial(title='The Count\'s Idea', description='''
                     Music: The Count’s Idea by Charlie Barnet & His Orchestra
                     ''',
                     video_link='https://www.youtube.com/watch?v=qRisU5BzKD0',
                     date='', style_id=1, level_id=1, tier_id=1)

    all_tutorials = [vid_1]

    db.session.add_all(all_tutorials)
    db.session.commit()


def undo_tutorials():
    db.session.execute('TRUNCATE tutorials RESTART IDENTITY CASCADE;')
    db.session.commit()
