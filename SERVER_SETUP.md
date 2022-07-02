# OverQuota Authn Authz SPA Server Set Up

- Create droplet with ssh access on DigitalOcean
  
- Loosely Following this tutorial to set up the server: <https://blog.nodeswat.com/set-up-a-secure-node-js-web-application-9256b8790f11>

- Set up a user with limited privileges <https://www.digitalocean.com/community/questions/how-to-enable-ssh-access-for-non-root-users>
  
- Set user bash <https://www.tecmint.com/change-a-users-default-shell-in-linux/>

- Used this post to install node and npm <https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04>

- Here is a good tutorial on systemd services and node <https://www.cloudbees.com/blog/running-node-js-linux-systemd> & <https://www.shubhamdipt.com/blog/how-to-create-a-systemd-service-in-linux/>
  
- Used this post to install nginx <https://www.linuxbabe.com/ubuntu/install-nginx-latest-version-ubuntu-18-04>

- Used this example to set up the nginx config <https://www.nginx.com/resources/wiki/start/topics/examples/full/>

- Used this tutorial to install certbot <https://certbot.eff.org/instructions?ws=nginx&os=ubuntufocal>

- Crate an "A" record with a subdomain In the DNS record of the domain you will be using.

- To set up a firewall I used this tutorial on iptables <https://upcloud.com/community/tutorials/configure-iptables-ubuntu/>

## Deploying changes to the live auth server

- https://dev.auth.spa.viewportmedia.org/

- $ npm run build

- $ deploy/scp-devAuthSpa.sh

- $ ssh zsysadmin@147.182.196.143

- $ cd /var/appdata/devauthspa/public/
  
## Restart the nginx services

- $ sudo systemctl restart nginx
