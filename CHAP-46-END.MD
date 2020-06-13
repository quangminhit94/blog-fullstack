# 46. Deploy your first app to AWS with ELB

1 Create Web Environment
2 Set up VPC Virtual private Cloud
3 Set up EC2 Instance

# 47. How networking works in cloud computing

- Same way networking is done with hardware
- All hardware required for networking such as, Routers, Switchers and internet Gateways, are all virtualized in cloud computing.
- Most web hosting services take care of networking for you behind the scenes, but we will setup the networking from scratch
- Networking determine how our resources, web server and database communicate with each other and the wider internet
- VPC, IP address and Subnets are the most important concepts to learn for networking in AWS cloud computing
  
# 48. Public vs Private IP addresses

Network: A way to connect computers to each other

What we call the internet is just one of many networks.

IP address is a way to identify a single computer on a network. Regardless of whether this network is the internet or not

So private ip addresses are just a way we can identify computers on our own network and public ip addresses are a way we can identify computers on the "internet" network.

# 49 ipv4 addresses

Example: 10.12.15.22

Referred to as IPv4 since there are 4 bytes which can represent the address. Each byte contains 8 bits and is therefore referred to as an **octet**

Since each octet contains 8 bits and each bit can be 0 or 1, there is 2 ^ 8 = 256 different combinations. But we start at 0 so an octet can be a number between 0-255. Since we have 4 octets we have 256 ^ 4 = 4.3 billion different combinations and therefore IP addresses!

A IPv4 addresses is resolved to human readable format: "http://google.com" through an DNS

# 50. connecting to the public internet from a private network

Done through an internet gateway

When a request is made by a computer in a private network a routing table checks to see if the destination is for a local computer or not

If not then the request is forwarded to the internet gateway which forwards it out of the private network and An Internet Service Provider where it is sent to the intended destination

The internet gateway also receives requests from the internet as well.

The internet gateway has its own public IP address, so a network can have 1 public even if it has 1000s of private ip addresses.

The protocol used for sending and receiving data is called TCP. This is a pattern and blueprint that ensures data integrity and reliability

# 51. how AWS vpc works

- Virtual private cloud
- Hosts all the virtual resources in one place
- You can deploy web servers, databases, file servers and messaging services into a VPC and have all your resources contained in one virtual place
- Each resource is identified by a private IP address.
- Resources can communicate with each other through route tables
- Resources can communicate with internet through an internet gateway

**Analogy:** 
Imagine VPC as a big office building. This company has dozens of computers for each of it employees. 

The computers are hooked up to each other through a local router. Each computer has a local ip addresses and can communicate and send information to each other computers with its own local ip address. 

The computers are also connected to the internet through an internet gateway. Requests outside of the local ip address range are forwarded to the internet gateway and then subsequently forwarded to the public internet ip address they are destined for. 

The company also has its own hardware database which are several hard drivers housed in a server rack. For security reasons, the database shouldn't be accessible by the internet so it is only accessible by the local network router. There is also a file server that is also many hard drives housed in a server rack. The file is also only accessible by local ip addresses.

The AWS VPC is like this, except everything that is hardware in this scenario is virtual and hosted on the VPC.

# 52. subnetting in AWS

## **Subnet** 

Sub network or a small sub section of the entire VPC

A way to divide up your entire VPC for performance and security reasons

Example: To deploy a database in a subnet that is inaccessible by the internet. While another subnet that has the web servers will need to be accessible by the internet. Even though Both of these subnets are seperate they are still part of the same VPC.

Subnetting in AWS is done with CIDR notation instead of classes

## **Subnet Mask**

A way divide your subnet into an approximate number of IP addresses

Example subnet CIDR notation: 10.11.12.0/24

/24 means the first 24 bits are to be used as a network prefix and therefore are unusable. Since an IPv4 has 32 total bits we have 8 bits left which are known as the Host address. These are the usable IP addresses. Since 8 bits has 256 combinations our subnet can have any address that is between 10.11.12.0 and 10.11.12.255

1s represent the network prefix and 0s represent the host addresses

/24 = 255.255.255.0 = 11111111.11111111.11111111.000000000

Same: 
10.11.12.0/24
10.11.12.0/255.255.255.0
10.11.12.0/11111111.11111111.11111111.000000000

## **Subnet Masks cont**

A subnet does not have to evenly divide into octets either.

10.11.12.0 /19 means a subnet mask of 11111111.11111111.11100000.00000000

If we go a subnet calculator we can see how this works

Since the first 2 octets are all 1s both the octets are used as the network prefix, and they can be any number between 0-255. But our third octet has only the partial network and we have only 5 bits to use as our host addresses. This mean that second octet can only be a number between 0-31 since 2 ^ 5 = 32

Our last octet is all 0s, so as normal it can be any number between 0-255

All together this means that our subnet can be any address that is between 10.11.0.0 and 10.11.31.255