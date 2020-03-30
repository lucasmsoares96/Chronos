<template>
    <div class="admin-page-tabs">
        <b-card no-body>
            <b-tabs lazy card>
                <b-tab title="Reservas aguardando análise">
                    <AwaitingAnalysis />
                </b-tab>
                <b-tab title="Histórico de Decisões">
                    <HistoryDecisions />
                </b-tab>
            </b-tabs>
                
        </b-card>
    </div>
</template>

<script>
import AwaitingAnalysis from "./AwaitingAnalysis";
import HistoryDecisions from "./HistoryDecisions";

export default {
    name: "ResourcesAdmin",
    components: {
        AwaitingAnalysis, HistoryDecisions
    }
};
</script>

<style>
.btn2 {
    width: 60px;
}
</style>