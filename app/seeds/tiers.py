from app.models import db, Tier


def seed_tiers():
    public = Tier(
        title='Public', price=0, img_url='img.png',
        description='Open to the public')
    tier_1 = Tier(
        title='Feel-it-out Follow', price=5, img_url='img.png',
        description='''1 new Follow Focus tutorial each month, 30% discount on
        weekly Live Solo Jazz Class taught by Natalia, Access to Follow Focus
        Community group on Facebook (post practice videos of yourself, get
        commentary feedback from Natalia & Irina), All Feel-It-Out tier videos
        from previous months, Saturday practice session''')
    tier_2 = Tier(
        title='Fancy Follow', price=15, img_url='img.png',
        description='''2 new Follow Focus tutorials each month, 1 new Solo
        Jazz Challenge routine with counts, 50% discount on weekly Live Solo
        Jazz Class taught by Natalia, Access to Follow Focus Community group
        on Facebook (post practice videos of yourself, get commentary feedback
        from Natalia & Irina), All Fancy tier videos from previous months,
        Saturday practice session''')
    tier_3 = Tier(
        title='Fierce Follow', price=20, img_url='img.png',
        description='''4 new Follow Focus tutorials each month, 1 new Solo
        Jazz Challenge routine with counts and full breakdown, Free weekly
        Live Solo Jazz Class taught by Natalia, A 20 minute personal video
        review and feedback sessions every three months with one of the
        seestars, Access to Follow Focus Community group on Facebook (post
        practice videos of yourself, get commentary feedback from Natalia or
        Irina), All Fierce tier videos from previous months, Saturday practice
        session''')
    tier_4 = Tier(
        title='Fantabulous Follow', price=30, img_url='img.png',
        description='''4 new Follow Focus tutorials each month, 1 new Solo
        Jazz Challenge routine with counts and full breakdowns, Free weekly
        Live Solo Jazz Class taught by Natalia, All Live Solo Jazz Class
        recordings, Recordings of any live Follow Focus workshops for 24hrs,
        Two 20 minute personal video review and feedback sessions every three
        months with either seestar, Access to Follow Focus Community group on
        Facebook (post practice videos of yourself, get commentary feedback
        from Natalia and Irina), All Follow Focus tutorials from previous
        months, Saturday practice sessio
        ''')

    all_tiers = [public, tier_1, tier_2, tier_3, tier_4]

    db.session.add_all(all_tiers)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_tiers():
    db.session.execute('TRUNCATE tiers RESTART IDENTITY CASCADE;')
    db.session.commit()
