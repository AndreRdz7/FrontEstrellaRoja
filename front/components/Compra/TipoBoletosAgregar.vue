<template>
    <div class="container setform">
      <br>
      <br>
    <!--Empieza la form-->
        <form>
        <!--Titulo-->
            <div class="form-group">
                <label for="name">Tipo de boleto</label>
                <input type="text" class="form-control sombra" id="name" v-model="ticket_type.name">
            </div>
        </form>
    <!--Termina la form-->

    <!--Boton Agregar-->
    <br>
    <br>
    <center>
            <button type="submit" class="btn btn-success shadow" @click.stop.prevent="ticket_typeFunction()">
                <div v-if="ticket_type.id == undefined">Crea Tipo de Ticket</div>
                <div v-else>Actualiza Tipo de Ticket</div>
            </button>
            
          </center>

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

    </div>   
    
</template>

<script>
import axios from "axios";

export default {
  //props is the parameter it receives
  props: ["idTicket_type"],
  data: function() {
    return {
      ticket_type: {}
    };
  },
  methods: {
    ticket_typeFunction() {
      if (this.ticket_type.id != undefined) {
        this.editTicket_type();
      } else {
        this.createTicket_type();
      }
    },
    async createTicket_type() {
      //alert(JSON.stringify(this.ticket_type))
      await axios({
        method: "post",
        url: "http://principal-arena-219118.appspot.com/api/ticket_type",
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          name: this.ticket_type.name
        }
      })
        .then(
          function(response) {
            //alert(JSON.stringify(response))
            this.$router.push({ name: "boletos" });
          }.bind(this)
        )
        .catch(function(error) {
          /*alert(JSON.stringify(error))*/
          console.log(error);
        });
    },
    async editTicket_type() {
      await axios({
        method: "put",
        url:
          "http://principal-arena-219118.appspot.com/api/ticket_type/" +
          this.idTicket_type,
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          name: this.ticket_type.name
        }
      })
        .then(
          function(response) {
            this.$router.push({ name: "boletos" });
            //alert("http://principal-arena-219118.appspot.com/api/ticket_type/" + this.idTicket_type)
            console.log("response");
            console.log(response);
            this.$router.push({ name: "boletos" });
          }.bind(this)
        )
        .catch(function(error) {
          console.log("error");
          console.log(error);
        });
    },
    async getTicket_type(id) {
      await axios({
        method: "get",
        url: "http://principal-arena-219118.appspot.com/api/ticket_type/" + id,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(
          function(response) {
            this.ticket_type = response.data;
            console.log(this.ticket_type);
          }.bind(this)
        )
        .catch(function(error) {
          console.log(error);
        });
    }
  },

  created: function() {
    console.log("start crea tipo de tiket");
    if (this.idTicket_type != undefined) {
      console.log("idTicket_type is not defined");
      this.getTicket_type(this.idTicket_type);
    }
  }
};
</script>

<style>
.container {
  margin-left: 160px;
  margin-right: 0px; /* Same as the width of the sidenav */
  display: inline-block;
  font-size: 20px; /* Increased text to enable scrolling */
  text-align: center;
  align-content: center;
}
.letrabonita {
  font-size: 22px;
  font: bold;
}
.sombra {
  box-shadow: 0 2px 6px rgba(39, 39, 39, 0.13), 0 2px 6px rgba(39, 39, 39, 0.13);
}
</style>