from app.models import db, Tutorial
from datetime import date


def seed_tutorials():
    vid_1 = Tutorial(title='The Count\'s Idea', description=
                     '''
                     Music: The Count’s Idea by Charlie Barnet & His Orchestra
                     ''',
                     video_link='https://www.youtube.com/watch?v=qRisU5BzKD0',
                     date=date(2020, 8, 7), style_id=1,
                     level_id=1, tier_id=1)
    vid_2 = Tutorial(title='Video 2', description=
                     '''
                     Video 2...
                     ''',
                     video_link='https://www.youtube.com/watch?v=qRisU5BzKD0',
                     date=date(2020, 7, 7), style_id=1,
                     level_id=1, tier_id=1)
    vid_3 = Tutorial(title='Video 3', description=
                     '''
                     Video 3...
                     ''',
                     video_link='https://www.youtube.com/watch?v=qRisU5BzKD0',
                     date=date(2020, 6, 7), style_id=1,
                     level_id=1, tier_id=1)

    all_tutorials = [vid_1, vid_2, vid_3]

    db.session.add_all(all_tutorials)
    db.session.commit()


def undo_tutorials():
    db.session.execute('TRUNCATE tutorials RESTART IDENTITY CASCADE;')
    db.session.commit()
