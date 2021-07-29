"""Tutorial model - description nullable

Revision ID: 3b571882779e
Revises: 9f7261ee9c87
Create Date: 2021-07-29 11:13:40.548053

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3b571882779e'
down_revision = '9f7261ee9c87'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tutorials', 'description',
               existing_type=sa.TEXT(),
               nullable=True)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('tutorials', 'description',
               existing_type=sa.TEXT(),
               nullable=False)
    # ### end Alembic commands ###
