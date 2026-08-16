module Dashboard
  class AuthenticationSerializer < Oj::Serializer
    attribute :message do
      @options[:message]
    end

    attribute :admin_user do 
      @object.slice(:uuid, :email)
    end
  end
end