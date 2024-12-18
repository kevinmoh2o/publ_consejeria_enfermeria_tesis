<template>
<div class="modal fade" id="modalPaciente" tabindex="-1" aria-labelledby="modalPacienteLabel" aria-hidden="true">
      <div class="modal-dialog modal-md modal-lg modal-xl modal-xxl">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="modalPacienteLabel">Datos del Paciente</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">


                  <form @submit="submitForm" class="needs-validation" novalidate>
                      <div class="row m-0 p-0 ">
                          
                        <div class="caja">
                            <i class="fas fa-id-card"></i>
                            <select class="form-select" id="validationCustom06" aria-placeholder="Tipo de documento" required>
                            <option selected disabled value="">Tipo de documento</option>
                                <option value="2">DNI</option>
                                <option value="3">Carne de Extranjeria</option>
                            </select>
                        </div>

                        <div class="caja">
                            <i class="fas fa-id-card"></i>
                            <input type="number" class="form-control" id="validationCustom01" placeholder="Documento de Identidad" required>
                        </div>

                        <div class="caja">
                            <i class="fas fa-calendar"></i>
                            <input id="startDate" class="form-control" type="date" required/>
                            <span id="startDateSelected"></span>
                        </div>

                        <div class="caja">
                            <i class="fas fa-user"></i>
                            <input type="number" class="form-control" id="validationCustom01" placeholder="Edad" required>
                        </div>

                        <div class="caja">
                            <i class="fas fa-mars"></i>
                            <select class="form-select" id="validationCustom06" required>
                            <option selected disabled value="">Sexo</option>
                                <option value="2"> Masculino</option>
                                <option value="3">Femenino</option>
                            </select>
                        </div>

                        <div class="caja">
                            <i class="fas fa-envelope"></i>
                            <input type="email" class="form-control" id="validationCustom01" placeholder="Correo electrónico" required>
                        </div>

                        <div class="caja">
                            <i class="fas fa-briefcase"></i>
                            <select class="form-select" name="ocupacion" id="ocupacion" required>
                                <option selected disabled value="">Ocupación</option>
                                <option value="estudiante">Estudiante</option>
                                <option value="empleado">Empleado</option>
                                <option value="desempleado">Desempleado</option>
                                <option value="freelancer">Freelancer</option>
                            </select>
                        </div>

                        <div class="caja">
                            <i class="fas fa-phone"></i>
                            <input type="number" class="form-control" id="validationCustom01" placeholder="Celular" required>
                        </div>

                        <div class="caja">
                            <i class="fas fa-users"></i>
                            <select class="form-select" name="ocupacion" id="ocupacion" required>
                                <option selected disabled value="">Selecciona un parentesco</option>
                                <option value="padre">Padre</option>
                                <option value="madre">Madre</option>
                                <option value="hijo">Hijo</option>
                                <option value="hija">Hija</option>
                                <option value="abuelo">Abuelo</option>
                                <option value="abuela">Abuela</option>
                                <option value="tío">Tío</option>
                                <option value="tía">Tía</option>
                            </select>
                        </div>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                          <button type="submit" class="btn btn-success">Guardar</button>
                      </div>
                  </form>
                  
              </div>
              
          </div>
      </div>
  </div>
</template>


<script>
export default {
    name: 'Modal-Paciente',
    components: {
    },
    props:{
        intitulo:String,
        inDescripcion:String
    },  
    methods:{
        isValid(fieldName) {
          return this.validation[fieldName];
      },
      submitForm(event) {
          const form = event.target;
          if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
          }
          form.classList.add('was-validated');
      },
    }
}
</script>
<style lang="scss" scoped>

.caja {
    display: flex;
    width: 300px;
    align-content: center;
    align-items: center;
    flex-direction: row;
    margin: 5px 10px 5px 10px;
}


.caja i{
    width: 40px;
    margin: 0 10px 0 10px;
    font-size: 25px;
    color: grey;
}


</style>