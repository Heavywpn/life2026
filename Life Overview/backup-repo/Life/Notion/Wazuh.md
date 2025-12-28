---
notes: Hello heavywpn! The following activity has recently occurred: * wazuh-one-click-ap-southeast - (616640538) Linode Initial Configuration - Completed Mon, 23 Sep 2024 23:26:06 GMT * wazuh-one-click-ap-southeast - (616640539) Disk Create From StackScript - Completed Mon, 23 Sep 2024 23:26:12 GMT * wazuh-one-click-ap-southeast - (616640540) Create Swap - Completed Mon, 23 Sep 2024 23:26:46 GMT * wazuh-one-click-ap-southeast - (616640541) System Boot - My Ubuntu 22.04 LTS Profile - Completed Mon, 23 Sep 2024 23:26:48 GMT
Root details: heavywpn    2843092kdj90u2021332
server specs: 2 CPU Cores80 GB Storage4 GB RAM0 VolumesPublic IP Addresses45.79.238.512400:8907::f03c:95ff:fec3:2ea6AccessSSH Accessssh root@45.79.238.51LISH Console via SSHssh -t heavywpn@lish-ap-southeast.linode.com wazuh-one-click-ap-southeast
Web addresses: http://45-79-238-51.ip.linodeusercontent.com/
---
> [!important] Sudo Username: heavywpn<br>Sudo Password: 0E9Dxp1NqgGm1O5WpR7nh4me2
> 
> # Admin user for the web user interface and Wazuh indexer. Use this user to log in to Wazuh dashboard
> 
> indexer_username: 'admin'  
> indexer_password: 'ifOJDGalb1Ix6Lha?suzlu12hnQtbuzs'
> 
> # Wazuh dashboard user for establishing the connection with Wazuh indexer
> 
> indexer_username: 'kibanaserver'  
> indexer_password: 'hU57s9CdJ_P+?Y+hoSLIDgSs3vek_CHb'
> 
> # Regular Dashboard user, only has read permissions to all indices and all permissions on the .kibana index
> 
> indexer_username: 'kibanaro'  
> indexer_password: '43z3*+eOUT8Dr4wYYpmj*2azCjXUraqU'
> 
> # Filebeat user for CRUD operations on Wazuh indices
> 
> indexer_username: 'logstash'  
> indexer_password: 'ewNzUP9sFM9QJKJDcoFO6GWea8m+CTNk'
> 
> # User with READ access to all indices
> 
> indexer_username: 'readall'  
> indexer_password: 'fVeVeW9rnD5OQlHTO1wIh?47vaLYoGuE'
> 
> # User with permissions to perform snapshot and restore operations
> 
> indexer_username: 'snapshotrestore'  
> indexer_password: 'Wgg2FWqYH2?BaYc+NIM5+ib8nHGIBq1v'
> 
> # Password for wazuh API user
> 
> api_username: 'wazuh'  
> api_password: '9V*OVVsA4c7yCw5T6vtkewWAGetQnLJi'
> 
> # Password for wazuh-wui API user
> 
> api_username: 'wazuh-wui'  
> api_password: 'P5y+BirRg2KHG9Db067Pe.y9sjs+gFBj'