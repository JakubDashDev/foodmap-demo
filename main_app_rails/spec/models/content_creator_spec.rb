require 'rails_helper'

RSpec.describe ContentCreator, type: :model do
  it 'is valid with a name' do
    content_creator = build(:content_creator)
    expect(content_creator).to be_valid
  end

  it 'is invalid without a name' do
    content_creator = build(:content_creator, name: nil)
    expect(content_creator).not_to be_valid
  end

  it 'is invalid with a duplicate name' do
    create(:content_creator, name: 'Ksiazulo')
    duplicate = build(:content_creator, name: 'Ksiazulo')
    expect(duplicate).not_to be_valid
  end

  it 'is invalid with a duplicate channel_url' do
    create(:content_creator, channel_url: 'https://youtube.com/@ksiazulo')
    duplicate = build(:content_creator, channel_url: 'https://youtube.com/@ksiazulo')
    expect(duplicate).not_to be_valid
  end
end
