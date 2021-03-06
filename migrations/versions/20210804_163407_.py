"""empty message

Revision ID: 23c8a00d0c3a
Revises: 9abcae790772
Create Date: 2021-08-04 16:34:07.727823

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '23c8a00d0c3a'
down_revision = '9abcae790772'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('tutorial_tags_tag_id_fkey', 'tutorial_tags', type_='foreignkey')
    op.drop_constraint('tutorial_tags_tutorial_id_fkey', 'tutorial_tags', type_='foreignkey')
    op.create_foreign_key(None, 'tutorial_tags', 'tutorials', ['tutorial_id'], ['id'], ondelete='CASCADE')
    op.drop_column('tutorial_tags', 'tag_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tutorial_tags', sa.Column('tag_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'tutorial_tags', type_='foreignkey')
    op.create_foreign_key('tutorial_tags_tutorial_id_fkey', 'tutorial_tags', 'tutorials', ['tutorial_id'], ['id'])
    op.create_foreign_key('tutorial_tags_tag_id_fkey', 'tutorial_tags', 'tags', ['tag_id'], ['id'])
    # ### end Alembic commands ###
