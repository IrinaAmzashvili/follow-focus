"""Add cascade delete to tags join table

Revision ID: 079789f3a22f
Revises: bc781685b870
Create Date: 2021-08-04 16:37:11.147832

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '079789f3a22f'
down_revision = 'bc781685b870'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tutorial_tags', sa.Column('tutorial_id', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'tutorial_tags', 'tutorials', ['tutorial_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tutorial_tags', type_='foreignkey')
    op.drop_column('tutorial_tags', 'tutorial_id')
    # ### end Alembic commands ###