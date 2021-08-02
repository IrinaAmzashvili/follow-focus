from app.models import db, Comment


def seed_comments():
    comment_1 = Comment(body='''You like going to the garage, huh? So does daddy. It's fine, actually. Your mom never wears anything I buy her.  These are Pym Particles, alright? And ever since Hank Pym got snapped out of existence, this is it. This is what we have. We're not making any more.  For the last five years I've been trying to do one thing: Get to right here. That's all it's been about. Bringing everybody back.''', user_id=1, tutorial_id=1)
    comment_2 = Comment(body='''We need you. You're new blood. Bunch of tired old mules! That's great. You did the hardest part. You took the jump, you didn't know where you were gonna come down. And that's it. That's those little brave baby steps we gotta take. To try and become whole again, try and find purpose. I went in the ice in '45 right after I met the love of my life. Woke up 70 years later. You gotta move on. Gotta to move on. The world is in our hands. It's left to us guys, and we got to do something with it. Otherwise... Thanos should have killed all of us.  Five years ago, we lost. All of us. We lost friends... We lost family... We lost a part of ourselves. Today, we have a chance to take it all back. You know your teams, you know your missions. Get the stones, get them back. One round trip each. No mistakes. No do-overs. Most of us are going somewhere we know. But it doesn't mean we should know what to expect. Be careful. Look out for each other. This is the fight of our lives. And we're gonna win.  Everyone fails at who they are supposed to be, Thor. The measure of a person, of a hero, is how well they succeed at being who they are.  No, this was a gift. And you're going to be the man you're meant to be.   I got it. There's another way. To retake the Tesseract and acquire new particles. We'll stroll down memory lane. Military installation, Garden State.''', user_id=2, tutorial_id=1)
    comment_3 = Comment(body='''The Federales found a room full of bodies. Looks like a bunch of cartel guys. Never even had the chance to get their guns off.  Gotta say, sometimes I miss that giddy optimism. However, high hopes won't help if there's no logical, tangible way for me to safely execute said time heist. I believe the most likely outcome would be our collective demise.  Okay, so, uhh... We just wait around for this Quill guy to show up and then he leads us to the Power Stone, is that it?  We just, wait around for this Quill guy to show up, and then he leads us to the Power Stone, is that it?''', user_id=3, tutorial_id=1)
    comment_4 = Comment(body='''You like going to the garage, huh? So does daddy. It's fine, actually. Your mom never wears anything I buy her.  These are Pym Particles, alright? And ever since Hank Pym got snapped out of existence, this is it. This is what we have. We're not making any more.  For the last five years I've been trying to do one thing: Get to right here. That's all it's been about. Bringing everybody back.''', user_id=4, tutorial_id=1)
    comment_5 = Comment(body='''You like going to the garage, huh? So does daddy. It's fine, actually. Your mom never wears anything I buy her.  These are Pym Particles, alright? And ever since Hank Pym got snapped out of existence, this is it. This is what we have. We're not making any more.  For the last five years I've been trying to do one thing: Get to right here. That's all it's been about. Bringing everybody back.''', user_id=5, tutorial_id=1)
    comment_6 = Comment(body='''You like going to the garage, huh? So does daddy. It's fine, actually. Your mom never wears anything I buy her.  These are Pym Particles, alright? And ever since Hank Pym got snapped out of existence, this is it. This is what we have. We're not making any more.  For the last five years I've been trying to do one thing: Get to right here. That's all it's been about. Bringing everybody back.''', user_id=6, tutorial_id=1)
    comment_7 = Comment(body='''You like going to the garage, huh? So does daddy. It's fine, actually. Your mom never wears anything I buy her.  These are Pym Particles, alright? And ever since Hank Pym got snapped out of existence, this is it. This is what we have. We're not making any more.  For the last five years I've been trying to do one thing: Get to right here. That's all it's been about. Bringing everybody back.''', user_id=7, tutorial_id=1)
    comment_8 = Comment(body='''You like going to the garage, huh? So does daddy. It's fine, actually. Your mom never wears anything I buy her.  These are Pym Particles, alright? And ever since Hank Pym got snapped out of existence, this is it. This is what we have. We're not making any more.  For the last five years I've been trying to do one thing: Get to right here. That's all it's been about. Bringing everybody back.''', user_id=8, tutorial_id=1)
    comment_9 = Comment(body='''You like going to the garage, huh? So does daddy. It's fine, actually. Your mom never wears anything I buy her.  These are Pym Particles, alright? And ever since Hank Pym got snapped out of existence, this is it. This is what we have. We're not making any more.  For the last five years I've been trying to do one thing: Get to right here. That's all it's been about. Bringing everybody back.''', user_id=9, tutorial_id=1)

    all_comments = [comment_1, comment_2, comment_3, comment_4, comment_5, comment_6, comment_7, comment_8, comment_9]

    db.session.add_all(all_comments)
    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
