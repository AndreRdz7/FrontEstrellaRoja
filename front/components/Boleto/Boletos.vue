<template>
  <div class="container">
    <br>
    <div class="mt-5">
    <div class="row">
    <!--Buscador-->
    <div class="col">
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Ingrese texto a buscar" aria-label="Search">
        <button class="btn btn-outline-danger my-2 my-sm-0" type="submit"><img src="@/static/magnifier.png" width="20" height="20"></button> 
      </form>
    </div>
    <!--Tipo de boletos-->
      <div class = "col text-center">
        <nuxt-link :to="{ name: 'boletos-tipoboleto'}" replace>     
        <button type="button" class="btn btn-warning">Tipo de boleto</button>
        </nuxt-link> 
      </div>
    <!--Agregar-->
      <div class = "col text-right">
        <nuxt-link :to="{ name: 'boletos-agregar'}" replace>
        <button type="button" class="btn btn-info text-right">Agregar</button>
        </nuxt-link> 
      </div>
    </div>
    <!--Tabla-->
    <table class="table mt-3">
      <thead class="bg-success">
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre del cliente</th>
          <th scope="col">Apellido del cliente</th>
          <th scope="col">Fecha del tour</th>
          <th scope="col">Codigo QR</th>
          <th scope="col">Total</th>
          <th scope="col">Detalles</th>
          <th scope="col">Editar</th>
          <th scope="col">Borrar</th>
        </tr>
      </thead>
        <tbody>
          <tr v-for="ticket in this.$store.state.tickets" :key='ticket.id'>
            <th>{{ ticket.id }}</th>
            <th>{{ ticket.client_name }}</th>
            <td>{{ ticket.client_last_name }}</td>
            <td>{{ ticket.tour_date }}</td>
            <td>{{ ticket.qr_code }}</td>
            <td>{{ ticket.total }}</td>
             <td><button v-b-modal.modal-center  class="btn btn-info" type="button"><img src="@/static/file.png"></button>
              <b-modal id="modal-center" title="Detalles" ok-only ok-variant="secondary" ok-title="Cerrar">
                <div class="modal-lg">
                <div class="my-4">
                  <thead>
                    <tr>
                      <th scope="col">ID</th>
                      <th scope="col">Nombre</th> 
                      <th scope="col">Apellido</th>
                      <th scope="col">Correo</th>
                      <th scope="col">Subtotal</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody v-for="purchase in $store.state.purchases" :key="purchase.id" v-if="ticket.purchase_id == purchase.id">
                      <tr v-for="user in $store.state.users" :key="user.id" v-if="purchase.user_id == user.id">
                        <td>{{ purchase.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.last_name }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ purchase.sub_total }}</td>
                        <td>{{ purchase.total }}</td>
                      </tr>
                  </tbody>
                </div>
                </div>
              </b-modal>
             </td>
            <td><button class="btn btn-info" type="button" @click="editTicketAction(ticket.id)"><img src="@/static/pencil.png"></button></td>
            <td><button class="btn btn-info" type="button" @click="deleteTicketAction(ticket.purchase_id)"><img src="@/static/basurero.png"></button></td>
          </tr>
        </tbody>
    </table>
  </div> 
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    async getTickets() {
      await axios({
        method: "get",
        url: "http://principal-arena-219118.appspot.com/api/ticket"
      })
        .then(
          function(response) {
            console.log("response");
            console.log(response);
            this.$store.commit({
              type: "storeTickets",
              tickets: response.data
            });
          }.bind(this)
        )
        .catch(function(error) {
          console.log("error");
          console.log(error);
        });
    },
    async getPurchases() {
      await axios({
        method: "get",
        url: "http://principal-arena-219118.appspot.com/api/purchase"
      })
        .then(
          function(response) {
            console.log("response");
            console.log(response);
            this.$store.commit({
              type: "storePurchases",
              purchases: response.data
            });
          }.bind(this)
        )
        .catch(function(error) {
          console.log("error");
          console.log(error);
        });
    },
    async getUsers() {
      await axios({
        method: "get",
        url: "http://principal-arena-219118.appspot.com/api/user"
      })
        .then(
          function(response) {
            console.log("response");
            console.log(response);
            this.$store.commit({
              type: "storeUsers",
              users: response.data
            });
          }.bind(this)
        )
        .catch(function(error) {
          console.log("error");
          console.log(error);
        });
    },
    async deleteTicket(id) {
      console.log("Delete ticket");
      await axios({
        method: "delete",
        url: "http://principal-arena-219118.appspot.com/api/ticket/" + id,
        data: {
          id: id
        }
      })
        .then(
          function(response) {
            console.log("response");
            console.log(response);
            this.getTickets();
          }.bind(this)
        )
        .catch(function(error) {
          console.log("error");
          console.log(error);
        });
    },

    editTicketAction(id) {
      //send to create view
      this.$router.push({ name: "boletos-agregar", params: { idTicket: id } });
    },
    deleteTicketAction(id) {
      this.deleteTicket(id);
    }
  },
  created: function() {
    this.getTickets();
    this.getPurchases();
    this.getUsers();
  }
};
</script>

<style>


.container {
  margin-left: 160px; /* Same as the width of the sidenav */
  font-size: 15px; /* Increased text to enable scrolling */
  text-align: center;
  align-content: center;
}
.derecha {
  padding-right: 110px;
  margin-left: 160px;
}
.bg-success {
  color: #ffffff;
}
</style>


