from flask.cli import AppGroup
from .tiers import seed_tiers, undo_tiers
from .tags import seed_tags, undo_tags
from .styles import seed_styles, undo_styles
from .levels import seed_levels, undo_levels
from .users import seed_users, undo_users
from .tutorials import seed_tutorials, undo_tutorials

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_tiers()
    seed_tags()
    seed_styles()
    seed_levels()
    seed_users()
    seed_tutorials()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_tiers()
    undo_tags()
    undo_styles()
    undo_levels()
    undo_users()
    undo_tutorials()
    # Add other undo functions here
