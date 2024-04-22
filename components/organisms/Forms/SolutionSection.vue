<template>
    <div class="row custom-solutions" style="background-color: #131B23;">
    <div class="flex flex-col w-full">
      <LineWithText titleText="Soluções"/>
      <TitleAndDescription
        title="Gestão de Times de Vôlei"
        description="Descubra a liberdade de gerenciar seu time de vôlei com eficiência e facilidade. O VolleyTrack é a solução definitiva para treinadores, jogadores e organizadores que desejam elevar o nível de suas equipes. Com nossa plataforma intuitiva, você pode organizar jogos, treinos e gerenciar seu elenco com apenas alguns cliques."
      /> 
      <div class="row py-4">
        <div class="flex flex-col md6">
          <CardSolution
            imageCard="/images/calendar-icon.svg"
            title="Agendamento Inteligente"
            description="Com nosso sistema de calendário avançado, planejar jogos e treinos nunca foi tão fácil. Defina os fundamentos específicos para cada sessão, detalhe o foco técnico e faça anotações personalizadas para garantir que cada treino seja produtivo e alinhado com os objetivos da equipe."
          />
        </div>
        <div class="flex flex-col md6">
          <CardSolution
            imageCard="/images/analyst.svg"
            title="Gerenciamento Completo de Equipes"
            description="Centralize as informações dos jogadores, incluindo estatísticas, frequência e progresso individual. Nosso sistema permite um controle detalhado da presença e do desempenho, além de oferecer um espaço para anotações e observações."
          />
        </div>
      </div>
      <div class="row">
        <div class="flex flex-col md6">
          <CardSolution
            imageCard="/images/chart.svg"
            title="Análise e Estatísticas Detalhadas"
            description="Transforme dados em insights com nossos relatórios detalhados. Monitore o crescimento dos jogadores e a evolução da equipe através de análises aprofundadas, ajudando a tomar decisões informadas e a estruturar treinos mais eficazes."
          />
        </div>
        <div class="flex flex-col md6">
          <CardSolution
            imageCard="/images/comunication.svg"
            title="Comunicação Eficiente e Direcionada"
            description="Garanta que todos estejam na mesma página com atualizações em tempo real e comunicação clara. Informe sobre os próximos treinos, mudanças de estratégia e novidades, mantendo a equipe unida e focada na melhoria constante do desempenho coletivo."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LineWithText from "~/components/organisms/Forms/LineWithText.vue";
import TitleAndDescription from "~/components/organisms/Forms/TitleAndDescription.vue";
import CardSolution from "~/components/organisms/Forms/CardSolution.vue";

</script>

<style>
.custom-solutions {
  padding: 3% 15%;
  color: #fff;
}

</style>
