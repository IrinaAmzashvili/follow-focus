from app.models import db, Tag


def seed_tags():
    tag_1 = Tag(tag_type='Solo Jazz Challenge Breakdowns')
    tag_2 = Tag(tag_type='Styling')
    tag_3 = Tag(tag_type='Mini Combo')
    tag_4 = Tag(tag_type='Move of the Month')
    tag_5 = Tag(tag_type='Drills')
    tag_6 = Tag(tag_type='Basics')
    tag_7 = Tag(tag_type='Workshop')
    tag_8 = Tag(tag_type='Connection')
    tag_9 = Tag(tag_type='Vintage Clip')
    tag_10 = Tag(tag_type='Choreography')
    tag_11 = Tag(tag_type='Switching')
    tag_12 = Tag(tag_type='Turns')
    tag_13 = Tag(tag_type='Rhythms')
    tag_14 = Tag(tag_type='Solo Jazz Routines')
    tag_15 = Tag(tag_type='Live Classes')
    tag_16 = Tag(tag_type='Natalia')
    tag_17 = Tag(tag_type='Irina')
    tag_18 = Tag(tag_type='Collab Routine')

    all_tags = [tag_1, tag_2, tag_3, tag_4, tag_5, tag_6, tag_7, tag_8, tag_9,
                tag_10, tag_11, tag_12, tag_13, tag_14, tag_15, tag_16, tag_17,
                tag_18]

    db.session.add_all(all_tags)
    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags RESTART IDENTITY CASCADE;')
    db.session.commit()
