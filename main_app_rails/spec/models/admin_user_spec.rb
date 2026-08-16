require 'rails_helper'

RSpec.describe AdminUser, type: :model do
  it 'is valid with a unique email and a password' do
    expect(build(:admin_user)).to be_valid
  end

  it 'is invalid with duplicated email' do
    create(:admin_user, email: 'admin@example.com')
    duplicate = build(:admin_user, email: 'admin@example.com')

    expect(duplicate).not_to be_valid
  end

  it 'is invalid with blank email' do
    admin_user = build(:admin_user, email: nil)

    expect(admin_user).not_to be_valid
  end

  it 'authenticates with the correct password and rejects the wrong one' do
    admin_user = create(:admin_user, password: 'correct-password')
    expect(admin_user.authenticate('correct-password')).to eq(admin_user)
    expect(admin_user.authenticate('wrong-password')).to eq(false)
  end
end