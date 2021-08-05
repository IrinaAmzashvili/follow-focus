from app.models import db, Style


def seed_styles():
    solo_jazz = Style(dance_style='Solo Jazz')
    lindy_hop = Style(dance_style='Lindy Hop')
    carolina_shag = Style(dance_style='Carolina Shag')
    balboa = Style(dance_style='Balboa')
    tap = Style(dance_style='Tap')
    # misc = Style(dance_style='Miscellaneous')

    all_styles = [solo_jazz, lindy_hop, carolina_shag, balboa, tap]

    db.session.add_all(all_styles)
    db.session.commit()


def undo_styles():
    db.session.execute('TRUNCATE styles RESTART IDENTITY CASCADE;')
    db.session.commit()
