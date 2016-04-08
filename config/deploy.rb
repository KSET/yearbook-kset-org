# require 'mina/bundler'
# require 'mina/rails'
require 'mina/git'
# require 'mina/dotenv'
# require 'mina/puma'

set :domain, '161.53.74.113'
set :deploy_to, '/home/yearbook/yearbook_kset_org'
set :repository, 'git@github.com:KSET/yearbook-kset-org.git'
set :branch, 'master'
set :user, 'yearbook'

set :shared_paths, []

task deploy: :stages do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    # invoke :'bundle:install'
    # invoke :'rails:db_migrate'
    # invoke :'rails:assets_precompile'
    invoke :'deploy:cleanup'

    to :launch do
      queue! %(echo "-----> Symlink system to shared")
      queue! "echo \"ln -nFs #{deploy_to}/shared/system #{deploy_to}/#{current_path}/public/system\""
      queue! %(ln -nFs #{deploy_to}/shared/system #{deploy_to}/#{current_path}/public/system)

      invoke :restart_application
    end
  end
end

# First ensure that the stage is selected
task :stages do
  # unless domain
  #   print_error 'A server needs to be specified. e.g. production/staging'
  #   exit
  # end
end

# Just overwrote to execute stages first
task setup: :stages do
  queue! %(mkdir -p "#{deploy_to}/shared/log")
  queue! %(chmod g+rx,u+rwx "#{deploy_to}/shared/log")
  queue! %(mkdir -p "#{deploy_to}/#{shared_path}/tmp/sockets")
  queue! %(chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/tmp/sockets")
  queue! %(mkdir -p "#{deploy_to}/#{shared_path}/tmp/pids")
  queue! %(chmod g+rx,u+rwx "#{deploy_to}/#{shared_path}/tmp/pids")
end

# Tail log from server
# task log: :stages do
#   queue "tail -f #{deploy_to}/#{current_path}/log/#{rails_env}.log"
# end

# Restart application after deployment
task :restart_application do
  queue %(echo "-----> Restarting application")
  queue "mkdir -p #{deploy_to}/#{current_path}/tmp/"
  queue "touch #{deploy_to}/#{current_path}/tmp/restart.txt"
  # invoke :'puma:phased_restart'
end
