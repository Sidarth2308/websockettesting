
const clients = [];
const vendors = [];

const addClient = ({id, name}) =>{
    name = name.trim().toLocaleLowerCase();
    const user = {id, name};
    clients.push(user);
    return {user:user};
};


const addVendor = ({id, name})=>{
    name = name.trim().toLocaleLowerCase();
    const user = {id, name};
    vendors.push(user);
    return {user:user};
};

const removeClient = (id) =>{
  const index = clients.findIndex((user)=>user.id ===id );
  if(index !== -1){
    return clients.splice(index,1)[0];
  }
};

const removeVendor = (id) =>{
    const index = vendors.findIndex((user)=>user.id ===id );
    if(index !== -1){
      return vendors.splice(index,1)[0];
    }
  };

const getClient = (id) =>{
  return clients.find((user) => user.id ===id);
};

const getVendor = (id) =>{
    return vendors.find((user) => user.id ===id);
};

const getVendors = ()=>{
  return vendors;
};
const getClients = ()=>{
    return clients
}

module.exports = {getClients, addClient, addVendor, removeClient, removeVendor, getClient, getVendor, getVendors};