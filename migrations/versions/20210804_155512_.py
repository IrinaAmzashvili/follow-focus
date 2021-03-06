"""empty message

Revision ID: 213b1eab6083
Revises: 3e68ddf7c183
Create Date: 2021-08-04 15:55:12.795089

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '213b1eab6083'
down_revision = '3e68ddf7c183'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('likes_user_id_fkey', 'likes', type_='foreignkey')
    op.drop_constraint('likes_tutorial_id_fkey', 'likes', type_='foreignkey')
    op.create_foreign_key(None, 'likes', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_column('likes', 'tutorial_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('likes', sa.Column('tutorial_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'likes', type_='foreignkey')
    op.create_foreign_key('likes_tutorial_id_fkey', 'likes', 'tutorials', ['tutorial_id'], ['id'])
    op.create_foreign_key('likes_user_id_fkey', 'likes', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###
