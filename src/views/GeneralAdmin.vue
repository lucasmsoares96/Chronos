<template>
  <div class="admin-page-tabs">
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Tipos de Recursos">
          <GeneralAdminTypeResources />
        </b-tab>
        <b-tab title="Recursos">
          <GeneralAdminResources />
        </b-tab>
        <b-tab title="Professores">
          <GeneralAdminTeachers />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import GeneralAdminResources from "../components/admin/generalAdmin/GeneralAdminResources";
import GeneralAdminTeachers from "../components/admin/generalAdmin/GeneralAdminTeachers";
import GeneralAdminTypeResources from "../components/admin/generalAdmin/GeneralAdminTypeResources";

export default {
  name: "GeneralAdmin",
  components: {
    GeneralAdminResources,
    GeneralAdminTeachers,
    GeneralAdminTypeResources
  }
};
</script>

<style>
</style>