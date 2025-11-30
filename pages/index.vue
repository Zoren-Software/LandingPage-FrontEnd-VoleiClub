<template>
  <section class="hero-banner">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">
        Automatize seus treinos e evolua sua equipe <span class="highlight">com inteligência.</span>
      </h1>
      <p class="hero-subtitle">
        O VolleyTrack é a plataforma feita para técnicos e gestores de vôlei que querem otimizar o desempenho dos seus atletas com tecnologia e organização.
      </p>
      <div class="hero-btn-row">
        <button class="hero-btn hero-btn-orange">Entrar na lista de espera</button>
        <button class="hero-btn" @click="routeRegister()">Registrar-se grátis</button>
      </div>
    </div>
  </section>

  <section class="benefits-section">
    <div class="benefits-container">
      <h2 class="benefits-title-highlight">Gestão de Times de Vôlei — mais simples, mais inteligente.</h2>
      <p class="benefits-subtitle">O sistema traz recursos práticos para o dia a dia dos treinadores e clubes —<br>mais organização, dados e resultados, menos complexidade.</p>
      <div class="benefits-cards-row">
        <div class="benefit-card border-orange">
          <va-icon name="event" size="38px" color="#ff7300" class="benefit-icon" />
          <h3 class="benefit-card-title">Agendamento Inteligente</h3>
          <p class="benefit-card-desc">Programe treinos e compromissos em poucos cliques. Receba lembretes automáticos e mantenha todos informados.</p>
        </div>
        <div class="benefit-card border-blue">
          <va-icon name="groups" size="38px" color="#1976d2" class="benefit-icon" />
          <h3 class="benefit-card-title">Gerenciamento de Equipes</h3>
          <p class="benefit-card-desc">Organize jogadores, monte times, defina funções e acompanhe o desempenho técnico de cada atleta.</p>
        </div>
        <div class="benefit-card border-dark">
          <va-icon name="show_chart" size="38px" color="#02254a" class="benefit-icon" />
          <h3 class="benefit-card-title">Análise e Estatísticas Detalhadas</h3>
          <p class="benefit-card-desc">Visualize gráficos, relatórios e histórico de desempenho para tomar as melhores decisões para o time.</p>
        </div>
        <div class="benefit-card border-orange">
          <va-icon name="forum" size="38px" color="#ff7300" class="benefit-icon" />
          <h3 class="benefit-card-title">Comunicação Direcionada</h3>
          <p class="benefit-card-desc">Envie avisos, mensagens e feedbacks aos times ou jogadores de forma rápida e segmentada.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="about-section">
    <div class="about-container">
      <div class="about-icon-col">
        <div class="about-icon-bg">
          <va-icon name="settings" size="48px" color="#ff7300" />
        </div>
      </div>
      <div class="about-content-col">
        <h2 class="about-title">Sobre o VolleyTrack</h2>
        <p class="about-text">
          O VolleyTrack nasceu para simplificar a vida dos treinadores de vôlei. Com ele, você organiza sua equipe, planeja treinos, registra presença e desempenho técnico com poucos cliques.
        </p>
        <div class="about-highlights">
          <span class="about-highlight"><va-icon name="mobile" size="18px" color="#ff7300" /> Facilidade e Mobilidade</span>
          <span class="about-highlight"><va-icon name="database" size="18px" color="#1976d2" /> Gestão Centralizada</span>
          <span class="about-highlight"><va-icon name="user" size="18px" color="#0a2c4d" /> Segurança de Dados</span>
        </div>
      </div>
    </div>
  </section>
  <section class="faq-section">
  <section class="faq-section">
    ...existing code...
  </section>

  <section class="plans-section">
    <div class="plans-container">
      <h2 class="plans-title">Escolha o plano ideal para o seu time</h2>
      <p class="plans-subtitle">Comece grátis, evolua conforme sua equipe cresce e pague apenas pelo que precisa.</p>
      <div class="plans-toggle-row">
        <button :class="['plans-toggle', { active: !isYearly }]" @click="isYearly = false">Mensal</button>
        <button :class="['plans-toggle', { active: isYearly }]" @click="isYearly = true">Anual</button>
      </div>
      <div class="plans-cards-row">
        <!-- Card 1: Trial -->
        <div class="plan-card border-orange plan-trial">
          <div class="plan-card-badge plan-card-badge-active">Plano Ativo</div>
          <va-icon name="card_giftcard" size="38px" color="#ff7300" class="plan-card-icon" />
          <h3 class="plan-card-title plan-card-title-bold">15 Dias Grátis</h3>
          <div class="plan-card-price plan-card-price-bold">R$ 0</div>
          <div class="plan-card-desc plan-card-desc-muted">Duração: 15 dias</div>
          <ul class="plan-card-benefits plan-card-benefits-check">
            <li><va-icon name="check" size="18px" color="#ff7300" /> Times ilimitados</li>
            <li><va-icon name="check" size="18px" color="#ff7300" /> Jogadores ilimitados</li>
          </ul>
          <div class="plan-card-warning plan-card-warning-box">
            <va-icon name="mail" size="16px" color="#ff7300" style="margin-right:6px;" />
            E-mail automático 3 dias antes do fim
          </div>
        </div>
        <!-- Card 2: Pro -->
        <div class="plan-card border-orange recommended">
          <div class="plan-card-badge">Recomendado</div>
          <h3 class="plan-card-title">Pro</h3>
          <div class="plan-card-price">R$ {{ isYearly ? '490 / ano' : '49 / mês' }}</div>
          <div class="plan-card-alt-price">{{ isYearly ? 'ou R$ 49 / mês' : 'ou R$ 490 / ano' }}</div>
          <ul class="plan-card-benefits">
            <li>Até 5 times</li>
            <li>Até 50 jogadores</li>
          </ul>
          <div class="plan-card-highlight">Migração automática pós-trial</div>
        </div>
        <!-- Card 3: Clubers -->
        <div class="plan-card border-blue">
          <div class="plan-card-badge">Para equipes grandes</div>
          <h3 class="plan-card-title">Clubers</h3>
          <div class="plan-card-price">R$ {{ isYearly ? '1.490 / ano' : '149 / mês' }}</div>
          <div class="plan-card-alt-price">{{ isYearly ? 'ou R$ 149 / mês' : 'ou R$ 1.490 / ano' }}</div>
          <ul class="plan-card-benefits">
            <li>Times ilimitados</li>
            <li>Jogadores ilimitados</li>
            <li>Acesso completo à plataforma</li>
          </ul>
        </div>
        <!-- Card 4: Vitalício -->
        <div class="plan-card border-dark">
          <div class="plan-card-badge">Oferta Limitada</div>
          <h3 class="plan-card-title">Vitalício</h3>
          <div class="plan-card-price">R$ 25</div>
          <div class="plan-card-desc">Pagamento único</div>
          <ul class="plan-card-benefits">
            <li>1 time</li>
            <li>Até 20 jogadores</li>
          </ul>
          <div class="plan-card-warning">Só para os primeiros 500 usuários</div>
          <div class="plan-card-progress-bar">
            <div class="plan-card-progress" :style="{ width: '24%' }"></div>
          </div>
          <div class="plan-card-progress-label">120 restantes</div>
        </div>
      </div>
    </div>
  </section>
    <h2 class="faq-title">Perguntas Frequentes</h2>
    <div class="faq-list">
      <va-collapse
        v-for="i in 10"
        :key="i"
        v-model="faqOpen[i]"
        class="faq-item"
        :header="$t(`question_${i}`)"
      >
        {{ $t(`answer_${i}`) }}
      </va-collapse>
    </div>
  </section>

</template>

<script setup lang="ts">

const isYearly = ref(false);
import { computed } from "vue";
import { useColors } from "vuestic-ui";
import { ref } from "vue";
import ContactForm from "~/components/organisms/Forms/ContactForm.vue";

const faqOpen = ref(Array(11).fill(false));

const routeRegister = () => {
  window.location.href = "/register";
};

const showSidebar = ref(false);
const page = ref(1);

const runtimeConfig = useRuntimeConfig();
const applicationName = runtimeConfig.public.nameApplication;

const { currentPresetName } = useColors();

const darkNavbarColors = computed(() => {
  if (currentPresetName.value === "light") {
    return {
      color: "#111111",
      textColor: "#BAFFC5",
    };
  } else {
    return {
      color: "#FBCAF6",
      textColor: "#481269",
    };
  }
});
</script>

<style>
.plan-trial {
  background: #fdf7f3;
  border: 3px solid #ff7300;
  box-shadow: 0 2px 16px rgba(255, 115, 0, 0.08);
}
.plan-card-badge-active {
  background: #ff7300;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 4px 18px;
  border-radius: 16px;
  position: absolute;
  top: -18px;
  right: 18px;
  left: auto;
  z-index: 2;
  box-shadow: 0 2px 8px rgba(255, 115, 0, 0.10);
}
.plan-card-icon {
  margin-top: 18px;
  margin-bottom: 8px;
}
.plan-card-title-bold {
  font-size: 1.25rem;
  font-weight: 900;
  color: #1a2940;
  margin-bottom: 8px;
  text-align: center;
}
.plan-card-price-bold {
  font-size: 2rem;
  font-weight: 900;
  color: #ff7300;
  margin-bottom: 4px;
  text-align: center;
}
.plan-card-desc-muted {
  font-size: 1rem;
  color: #1976d2;
  margin-bottom: 10px;
  text-align: center;
}
.plan-card-benefits-check {
  margin-bottom: 10px;
}
.plan-card-benefits-check li {
  display: flex;
  align-items: center;
  font-size: 1.08rem;
  color: #1a2940;
  font-weight: 600;
  margin-bottom: 8px;
  padding-left: 0;
}
.plan-card-warning-box {
  background: #ffe3d1;
  color: #ff7300;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 10px 14px;
  margin-top: 8px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
/* PLANS SECTION */
.plans-section {
  width: 100%;
  background: #fff;
  padding: 64px 0 64px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.plans-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.plans-title {
  font-size: 2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 10px;
  text-align: center;
}
.plans-subtitle {
  font-size: 1.15rem;
  color: #1a2940;
  margin-bottom: 28px;
  text-align: center;
}
.plans-toggle-row {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 38px;
}
.plans-toggle {
  background: #fff;
  color: #ff7300;
  border: 2px solid #ff7300;
  border-radius: 24px;
  font-size: 1.08rem;
  font-weight: 700;
  padding: 8px 32px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.plans-toggle.active, .plans-toggle:hover {
  background: #ff7300;
  color: #fff;
}
.plans-cards-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.plan-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(34, 41, 64, 0.08);
  border-top: 5px solid #ff7300;
  padding: 32px 24px 28px 24px;
  width: 260px;
  min-height: 370px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: box-shadow 0.2s;
}
.plan-card.border-orange {
  border-top: 5px solid #ff7300;
}
.plan-card.border-blue {
  border-top: 5px solid #1976d2;
}
.plan-card.border-dark {
  border-top: 5px solid #02254a;
}
.plan-card-badge {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff7300;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  padding: 4px 18px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(255, 115, 0, 0.10);
  z-index: 2;
}
.plan-card.recommended .plan-card-badge {
  background: #ff7300;
  color: #fff;
}
.plan-card-title {
  font-size: 1.35rem;
  font-weight: 900;
  color: #02254a;
  margin-bottom: 8px;
  margin-top: 18px;
  text-align: center;
}
.plan-card-price {
  font-size: 2rem;
  font-weight: 900;
  color: #ff7300;
  margin-bottom: 4px;
  text-align: center;
}
.plan-card-alt-price {
  font-size: 1rem;
  color: #1976d2;
  margin-bottom: 8px;
  text-align: center;
}
.plan-card-desc {
  font-size: 0.98rem;
  color: #1a2940;
  margin-bottom: 10px;
  text-align: center;
}
.plan-card-benefits {
  list-style: none;
  padding: 0;
  margin: 0 0 10px 0;
  width: 100%;
  color: #02254a;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
}
.plan-card-benefits li {
  margin-bottom: 6px;
  padding-left: 18px;
  position: relative;
}
.plan-card-benefits li:before {
  content: '•';
  color: #ff7300;
  position: absolute;
  left: 0;
}
.plan-card-warning {
  background: #fff3ea;
  color: #ff7300;
  font-size: 0.98rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: 8px;
  text-align: center;
}
.plan-card-highlight {
  background: #e6f7f2;
  color: #1976d2;
  font-size: 0.98rem;
  font-weight: 700;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: 8px;
  text-align: center;
}
.plan-card-progress-bar {
  width: 100%;
  height: 10px;
  background: #f7f9fc;
  border-radius: 8px;
  margin: 10px 0 2px 0;
  overflow: hidden;
}
.plan-card-progress {
  height: 100%;
  background: #ff7300;
  border-radius: 8px 0 0 8px;
  transition: width 0.4s;
}
.plan-card-progress-label {
  font-size: 0.95rem;
  color: #ff7300;
  font-weight: 700;
  text-align: center;
}
@media (max-width: 900px) {
  .plans-cards-row {
    flex-wrap: wrap;
    gap: 18px;
    justify-content: center;
  }
  .plan-card {
    width: 100%;
    min-width: 220px;
    max-width: 400px;
    margin-bottom: 18px;
  }
}
@media (max-width: 600px) {
  .plans-title {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
  .plans-subtitle {
    font-size: 1rem;
    margin-bottom: 18px;
  }
  .plans-container {
    padding: 0 8px;
  }
  .plan-card {
    padding: 18px 8px;
    min-height: 220px;
  }
}
/* HERO BANNER */
.hero-banner {
  position: relative;
  width: 100%;
  min-height: 70vh;
  background: url('/images/volei-banner.jpg') center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 32, 60, 0.60);
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 900px;
  padding: 48px 16px 40px 16px;
}
.hero-title {
  font-size: 3rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 18px;
  line-height: 1.15;
}
.highlight {
  color: #ff7300;
}
.hero-subtitle {
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 32px;
  font-weight: 400;
  max-width: 700px;
}
.hero-btn-row {
  display: flex;
  flex-direction: row;
  gap: 18px;
  justify-content: center;
  margin-top: 18px;
}
.hero-btn {
  background: #fff;
  color: #02254a;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 14px 32px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s, color 0.2s;
}
.hero-btn:hover {
  background: #ff7300;
  color: #fff;
}
.hero-btn-orange {
  background: #ff7300;
  color: #fff;
}
.hero-btn-orange:hover {
  background: #fff;
  color: #ff7300;
  border: 2px solid #ff7300;
}
@media (max-width: 900px) {
  .hero-banner {
    min-height: 50vh;
  }
  .hero-title {
    font-size: 2rem;
  }
  .hero-content {
    padding: 32px 8px 24px 8px;
  }
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-btn {
    font-size: 1rem;
    padding: 10px 18px;
  }
}
@media (max-width: 600px) {
  .hero-title {
    font-size: 1.2rem;
  }
  .hero-btn-row {
    flex-direction: column;
    gap: 10px;
  }
}
/* BENEFITS SECTION NOVO LAYOUT */
.benefits-section {
  width: 100%;
  background: #f7f9fc;
  padding: 56px 0 48px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
.benefits-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.benefits-title-highlight {
  font-size: 2.3rem;
  font-weight: 900;
  color: #ff7300;
  margin-bottom: 18px;
  text-align: center;
}
.benefits-subtitle {
  font-size: 1.15rem;
  color: #02254a;
  margin-bottom: 38px;
  text-align: center;
  line-height: 1.5;
}
.benefits-cards-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}
.benefit-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(34, 41, 64, 0.08);
  border-top: 5px solid #ff7300;
  padding: 32px 24px 28px 24px;
  width: 260px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s;
}
.benefit-card.border-orange {
  border-top: 5px solid #ff7300;
}
.benefit-card.border-blue {
  border-top: 5px solid #1976d2;
}
.benefit-card.border-dark {
  border-top: 5px solid #02254a;
}
.benefit-icon {
  margin-bottom: 18px;
}
.benefit-card-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 12px;
  text-align: center;
}
.benefit-card-desc {
  font-size: 1rem;
  color: #1a2940;
  text-align: center;
  line-height: 1.5;
}
@media (max-width: 900px) {
  .benefits-cards-row {
    gap: 18px;
  }
  .benefit-card {
    width: 100%;
    min-width: 220px;
    max-width: 400px;
    margin-bottom: 18px;
  }
}
@media (max-width: 600px) {
  .benefits-title-highlight {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
  .benefits-subtitle {
    font-size: 1rem;
    margin-bottom: 18px;
  }
  .benefits-container {
    padding: 0 8px;
  }
  .benefit-card {
    padding: 18px 8px;
    min-height: 220px;
  }
}
/* BENEFITS SECTION */
.benefits-section {
  width: 100%;
  background: #fff3ea;
  padding: 56px 0 48px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.benefits-container {
  max-width: 900px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.benefits-title {
  font-size: 2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 32px;
  text-align: left;
}
.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.benefit-item {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(255, 115, 0, 0.08);
  border: 1px solid #ffe3d1;
  padding: 24px 32px;
  font-size: 1.15rem;
  color: #1a2940;
}
.benefit-item strong {
  color: #ff7300;
  font-size: 1.18rem;
  font-weight: 700;
}
@media (max-width: 700px) {
  .benefits-title {
    font-size: 1.3rem;
    margin-bottom: 18px;
    text-align: center;
  }
  .benefits-container {
    padding: 0 8px;
    align-items: center;
  }
  .benefit-item {
    padding: 16px 12px;
    font-size: 1rem;
    text-align: left;
  }
}
@media (min-width: 1600px) {
  .custom-responsive {
    margin: 0 20%;
  }
}

@media (max-width: 600px) {
  .custom-titles {
    font-size: 2rem;
  }

  .text-apresentation {
    margin: 0, 0, 0, 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 767px) {
  .custom-titles {
    font-size: 2rem;
  }
}
/* HERO BANNER */
  .hero-banner {
    position: relative;
    width: 100%;
    min-height: 70vh;
    background: url('/images/volei-banner.jpg') center center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(10, 32, 60, 0.60);
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 800px;
  padding: 48px 16px 40px 16px;
}
.hero-title {
  font-size: 2.6rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 18px;
  line-height: 1.15;
}
.highlight {
  color: #ff7300;
}
/* BENEFITS SECTION CENTRALIZADA */
.benefits-section {
  width: 100%;
  background: #f7f9fc;
  padding: 56px 0 48px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.benefits-container {
  max-width: 1200px;
  width: 100%;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.benefits-cards-row {
  display: flex;
  flex-direction: row;
  gap: 32px;
  width: 100%;
  justify-content: center;
  align-items: stretch;
}
.benefit-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(34, 41, 64, 0.08);
  border-top: 5px solid #ff7300;
  padding: 32px 24px 28px 24px;
  width: 260px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  transition: box-shadow 0.2s;
}
@media (min-width: 1200px) {
  .benefits-cards-row {
    flex-wrap: nowrap;
    gap: 32px;
  }
  .benefit-card {
    width: 260px;
    min-width: 260px;
    max-width: 260px;
  }
}
@media (max-width: 900px) {
  .benefits-cards-row {
    flex-wrap: wrap;
    gap: 18px;
    justify-content: center;
  }
  .benefit-card {
    width: 100%;
    min-width: 220px;
    max-width: 400px;
    margin-bottom: 18px;
  }
}
@media (max-width: 600px) {
  .benefits-title-highlight {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
  .benefits-subtitle {
    font-size: 1rem;
    margin-bottom: 18px;
  }
  .benefits-container {
    padding: 0 8px;
  }
  .benefit-card {
    padding: 18px 8px;
    min-height: 220px;
  }
}
  .hero-subtitle {
    font-size: 1rem;
  }
  .hero-btn {
    font-size: 1rem;
    padding: 10px 18px;
  }
}
/* FAQ SECTION */
.faq-section {
  width: 100%;
  background: #fff;
  padding: 48px 0 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.faq-title {
  font-size: 2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 32px;
  text-align: center;
}
.faq-list {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.faq-item {
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid #ffe3d1;
  font-size: 1.08rem;
  font-weight: 600;
  color: #ff7300;
  transition: box-shadow 0.2s;
}
.faq-item .va-collapse__header {
  color: #ff7300;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 16px 24px;
}
.faq-item .va-collapse__content {
  color: #02254a;
  font-weight: 500;
  font-size: 1rem;
  padding: 16px 24px;
}
.faq-item .va-collapse__icon {
  color: #ff7300;
}
@media (max-width: 600px) {
  .faq-list {
    max-width: 100%;
    padding: 0 8px;
  }
  .faq-title {
    font-size: 1.3rem;
    margin-bottom: 18px;
  }
}
/* SOBRE O VOLLEYTRACK */

.about-section {
  width: 100%;
  background: #fff;
  padding: 64px 0 48px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.about-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1100px;
  width: 100%;
  gap: 64px;
  padding: 0 48px;
}
.about-icon-col {
  flex: 0 0 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-icon-bg {
  background: #fff3ea;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px rgba(255, 115, 0, 0.10);
}
.about-content-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
}
.about-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 10px;
  letter-spacing: -1px;
}
.about-text {
  font-size: 1.13rem;
  color: #1a2940;
  margin-bottom: 22px;
  max-width: 600px;
  line-height: 1.6;
}
.about-highlights {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  margin-top: 8px;
}
.about-highlight {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #02254a;
  font-size: 1.08rem;
  gap: 8px;
  background: none;
  padding: 0;
}
.about-highlight va-icon {
  margin-right: 4px;
}
@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    gap: 32px;
    padding: 0 16px;
  }
  .about-icon-col {
    margin-bottom: 12px;
  }
  .about-content-col {
    align-items: center;
    text-align: center;
  }
  .about-title, .about-text {
    text-align: center;
  }
}
/* FAQ SECTION */
.faq-section {
  width: 100%;
  background: #fff;
  padding: 48px 0 48px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.faq-title {
  font-size: 2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 32px;
  text-align: center;
}
.faq-list {
  width: 100%;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.faq-item {
  background: #f7f9fc;
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid #ffe3d1;
  font-size: 1.08rem;
  font-weight: 600;
  color: #ff7300;
  transition: box-shadow 0.2s;
}
.faq-item .va-collapse__header {
  color: #ff7300;
  font-weight: 700;
  font-size: 1.08rem;
  padding: 16px 24px;
}
.faq-item .va-collapse__content {
  color: #02254a;
  font-weight: 500;
  font-size: 1rem;
  padding: 16px 24px;
}
.faq-item .va-collapse__icon {
  color: #ff7300;
}
@media (max-width: 600px) {
  .faq-list {
    max-width: 100%;
    padding: 0 8px;
  }
  .faq-title {
    font-size: 1.3rem;
    margin-bottom: 18px;
  }
}
/* SOBRE O VOLLEYTRACK */

.about-section {
  width: 100%;
  background: #fff;
  padding: 64px 0 48px 0;
  display: flex;
  justify-content: center;
  border-bottom: 6px solid #f7f9fc;
}
.about-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 1100px;
  width: 100%;
  gap: 64px;
  padding: 0 48px;
}
.about-icon-col {
  flex: 0 0 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.about-icon-bg {
  background: #fff3ea;
  border-radius: 50%;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px rgba(255, 115, 0, 0.10);
}
.about-content-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  text-align: left;
}
.about-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 10px;
  letter-spacing: -1px;
}
.about-text {
  font-size: 1.13rem;
  color: #1a2940;
  margin-bottom: 22px;
  max-width: 600px;
  line-height: 1.6;
}
.about-highlights {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  margin-top: 8px;
}
.about-highlight {
  display: flex;
  align-items: center;
  font-weight: 700;
  color: #02254a;
  font-size: 1.08rem;
  gap: 8px;
  background: none;
  padding: 0;
}
.about-highlight va-icon {
  margin-right: 4px;
}
@media (max-width: 900px) {
  .about-container {
    flex-direction: column;
    gap: 32px;
    padding: 0 16px;
  }
  .about-icon-col {
    margin-bottom: 12px;
  }
  .about-content-col {
    align-items: center;
    text-align: center;
  }
  .about-title, .about-text {
    text-align: center;
  }
}
</style>
/* REGISTER MAIN SECTION */
.register-main-section {
  width: 100%;
  background: #f7f9fc;
  padding: 64px 0 64px 0;
  display: flex;
  justify-content: center;
}
.register-main-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  max-width: 600px;
  width: 100%;
  background: none;
  margin: 0 auto;
}
.register-main-form-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
}
.register-main-title {
  font-size: 2rem;
  font-weight: 800;
  color: #02254a;
  margin-bottom: 10px;
  text-align: center;
}
.register-main-subtitle {
  font-size: 1.15rem;
  color: #1a2940;
  margin-bottom: 24px;
  text-align: center;
}
.register-main-form-col .va-form {
  width: 100%;
  max-width: 400px;
  background: none;
  box-shadow: none;
  padding: 0;
}
.register-main-form-col .va-card {
  box-shadow: none;
  background: none;
  padding: 0;
}
.register-main-form-col .va-h3 {
  display: none;
}
.register-main-form-col .va-button {
  width: 100%;
  font-size: 1.15rem;
  font-weight: 700;
  background: #ff7300;
  color: #fff;
  border-radius: 8px;
  margin-top: 18px;
  margin-bottom: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: background 0.2s;
}
.register-main-form-col .va-button:hover {
  background: #ff8c1a;
}
.register-main-form-col .va-input, .register-main-form-col .va-select, .register-main-form-col .va-textarea {
  margin-bottom: 18px;
  border-radius: 8px;
  font-size: 1.08rem;
}
.register-main-form-col .va-input input, .register-main-form-col .va-select input, .register-main-form-col .va-textarea textarea {
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 10px 14px;
  font-size: 1.08rem;
  border-radius: 8px;
}
.register-main-form-col .va-input label, .register-main-form-col .va-select label, .register-main-form-col .va-textarea label {
  font-weight: 700;
  color: #02254a;
  margin-bottom: 4px;
}
@media (max-width: 900px) {
  .register-main-container {
    flex-direction: column;
    gap: 24px;
    align-items: center;
  }
}
