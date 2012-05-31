class Notifier < ActionMailer::Base
  
  default :from => "contributingcode contributingcode@vmware.com"
  
  # confirmation
  # @date 05/23/2012
  # @author Magil
  #
  # <b>Expects</b>
  # * <em>email</em> user email
  def register_email(name, email)
    @name = name
    mail( :to             => email, 
          :subject        => "Thank you for registering for contributingcode",
          :template_path  => 'mailer',
          :template_name  => 'register' )
  end


  #reused method for join a team/ Add member
  # type = 1 => join
  # type = 0 => added by owner
  def join_team_email(sender, team, user, type)
    @type = type
    @team = team.name 
    @sender = sender.name  

    mail( :to             => user.email, 
          :subject        => "Confirm team contributingcode",
          :template_path  => 'mailer',
          :template_name  => 'join_team')
  end

  # generic mailer
  #type 0 owner declines 
  #type 1 owner accepts 
  #type 2 leaves team
  #type 3 owner removes an accepted member
  #type 4 owner deletes team
  def decide_team_email(sender, team, user, type)
    @type = type
    @team = team.name 
    @sender = sender.name
    if type == 0 
      subject = "Request to join team was declined!"  
    elsif type == 1
      subject = "Request to join team was accepted!"  
    elsif type == 2
      subject = "A member left your team"
    elsif type == 3
      subject = "You were removed from the team"  
    else 
      subject = "The owener deleted your team!" 
    end
    mail( :to             => user.email, 
          :subject        => subject,
          :template_path  => 'mailer',
          :template_name  => 'decide_team')
  end

end