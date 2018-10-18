<template>
	<footer class="footer">
		<v-container grid-list-md>
			<v-layout row align-start justify-space-between wrap>
				<v-flex pa-0 xs12 sm6 md3 lg6 xl5 row wrap class="footer-left-col">
					<div class="copyright">2018 &copy; <img
							src="~/assets/images/DB_logo_Black_Green.svg"
							alt="dombook.ru - все новостройки, точный подбор, никакой рекламы."></div>
					<div class="hidden-md-only hidden-xs-only agreement">
						<div>Использование сайта означает согласие с
							<router-link to="/rules">&laquo;Пользовательским соглашением&raquo;</router-link>
						</div>
						<div>
							<router-link to="/cookies">Информация о &laquo;cookies&raquo;</router-link>
						</div>
					</div>
				</v-flex>
				<v-flex pa-0 xs12 sm6 md6 lg5 xl4 class="footer-right-col">
					<v-flex pa-0 class="footer-item">
						<router-link to="/about">О проекте</router-link>
					</v-flex>
					<v-flex pa-0 class="footer-item">
						<router-link to="/feedback">Обратная связь</router-link>
					</v-flex>
				</v-flex>
				<v-flex pa-0 xs12 sm12 md12 class="copyright-xs hidden-lg-and-up hidden-sm-only">
					<div class="agreement">
						<div>Использование сайта означает согласие с
							<router-link to="/rules">&laquo;Пользовательским соглашением&raquo;</router-link>
						</div>
						<div>
							<router-link to="/cookies">Информация о &laquo;cookies&raquo;</router-link>
						</div>
					</div>
				</v-flex>
			</v-layout>
		</v-container>
	</footer>
</template>

<script>
  export default {
    name: "footer-section",
  };
</script>

<style scoped>
	.footer {
		background: #F9F9F9;
		padding-top: 16px;
		padding-bottom: 16px;
	}

	.footer .container {
		padding-left: 0px;
		padding-right: 0px;
	}

	.footer .copyright {
		font-size: 22px;
		margin-right: 18px;
		font-weight: bold;
		max-width: 220px;
	}

	.agreement {
		font-size: 12px;
		font-weight: 400;
		color: #4A4A4A;
	}

	.agreement a {
		text-decoration: underline;
		color: #4A4A4A;
	}

	.footer .copyright img {
		height: 22px;
		width: auto;
	}

	.footer-item {
		text-align: right;
	}

	.footer-item a {
		color: #000;
		text-decoration: underline;
		font-size: 16px;
	}

	.footer-left-col {
		display: flex;
		flex-direction: row;
		justify-content: start;
	}

	.footer-right-col {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}

	.footer-right-col .footer-item {
		max-width: 200px;
	}

	@media screen and (max-width: 1904px) {
		.footer .copyright {
			font-size: 18px;
			max-width: 180px;
		}

		.footer .copyright img {
			height: 18px;
		}

		.agreement {
			font-size: 10px;
		}

		.footer-item a {
			font-size: 14px;
		}
	}

	@media screen and (max-width: 1264px) {
		.footer-left-col {
			flex-direction: column;
		}

		.footer .copyright {
			line-height: 1;
			margin-bottom: 16px;
		}
	}

	@media screen and (max-width: 960px) {
		.footer .container {
			padding-left: 30px;
			padding-right: 30px;
		}

		.footer-right-col {
			flex-direction: column;
		}

		.footer-item a {
			font-size: 16px;
		}

		.footer .copyright {
			font-size: 20px;
			max-width: 200px;
			margin-right: 0px;
		}

		.footer .copyright img {
			height: 20px;
		}

		.agreement {
			font-size: 12px;
		}
	}

	@media screen and (max-width: 600px) {
		.footer-left-col {
			order: 2;
		}

		.footer-right-col {
			order: 1;
			margin-bottom: 30px;
		}

		.footer-item {
			text-align: left;
		}

		.footer-item a {
			font-size: 18px;
		}

		.copyright-xs {
			order: 3;
		}

		.footer .copyright {
			font-size: 22px;
			margin-bottom: 30px;
			max-width: 100%;
		}

		.footer .copyright img {
			height: 22px;
		}

		.agreement {
			font-size: 14px;
		}
	}
</style>