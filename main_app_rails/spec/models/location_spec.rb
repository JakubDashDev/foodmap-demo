require 'rails_helper'

RSpec.describe Location, type: :model do
  it 'is valid with a name, address, latitude, and longitude' do
    location = build(:location)
    expect(location).to be_valid
  end

  it 'is invalid without a name' do
    location = build(:location, name: nil)
    expect(location).not_to be_valid
  end

  it 'is invalid without an address' do
    location = build(:location, address: nil)
    expect(location).not_to be_valid
  end

  it 'is invalid without a latitude' do
    location = build(:location, latitude: nil)
    expect(location).not_to be_valid
  end

  it 'is invalid without a longitude' do
    location = build(:location, longitude: nil)
    expect(location).not_to be_valid
  end

  it 'is invalid with the same name and address as an existing location' do
    create(:location, name: 'Pizzeria A', address: 'Main St 1')
    duplicate = build(:location, name: 'Pizzeria A', address: 'Main St 1')
    expect(duplicate).not_to be_valid
  end

  it 'is valid with the same name at a different address' do
    create(:location, name: 'Pizzeria A', address: 'Main St 1')
    same_name_different_address = build(:location, name: 'Pizzeria A', address: 'Main St 2')
    expect(same_name_different_address).to be_valid
  end
end
