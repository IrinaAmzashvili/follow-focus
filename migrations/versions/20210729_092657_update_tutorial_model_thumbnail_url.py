"""Update tutorial model - thumbnail_url

Revision ID: 9f7261ee9c87
Revises: ee82dbaf6024
Create Date: 2021-07-29 09:26:57.527799

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9f7261ee9c87'
down_revision = 'ee82dbaf6024'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tutorials', sa.Column('thumbnail_url', sa.Text(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tutorials', 'thumbnail_url')
    # ### end Alembic commands ###