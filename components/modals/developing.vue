<template>
	<v-dialog v-model="visible" content-class="developing-dialog" max-width="800" persistent
	          :fullscreen="$vuetify.breakpoint.smAndDown">
		<v-card>
			<div class="portrait-close">
				<v-btn @click.native="$emit('close')" flat class="close-btn"><span
						class="icon"></span>
				</v-btn>
			</div>
			<h2 class="text-xs-center header-main-title">Скоро</h2>
		</v-card>
	</v-dialog>
</template>

<script>
  export default {
      props: ['visible']
  };
</script>

<style scoped>
	.developing-dialog.v-dialog {
		border-radius: 8px;
	}

	.developing-dialog .v-card {
		border-radius: 8px;
		padding-top: 58px;
		padding-bottom: 98px;
	}

	.developing-dialog .header-main-title {
		margin-top: 0px;
		line-height: 1.2;
		padding-bottom: 38px;
		padding-left: 28px;
		padding-right: 28px;
	}

	.developing-dialog .header-main-title:after {
		border: 2px solid var(--secondary-color);
	}

	.developing-dialog .portrait-close {
		position: absolute;
		top: 30px;
		right: 30px;
		z-index: 10;
	}

	.developing-dialog .close-btn {
		border-radius: 50%;
		background: #b8b8b8;
		padding: 8px;
		min-width: 72px;
		width: 72px;
		height: 72px;
	}

	.developing-dialog .close-btn .icon {
		display: block;
		position: relative;
		height: 22px;
		width: 22px;
	}

	.developing-dialog .close-btn .icon:before {
		content: '';
		display: block;
		position: absolute;
		height: 22px;
		left: 50%;
		margin-left: -1px;
		width: 0px;
		border: 1.5px solid #FFFFFF;
		border-radius: 4px;
		transform: rotate(-45deg);
	}

	.developing-dialog .close-btn .icon:after {
		content: '';
		display: block;
		position: absolute;
		height: 22px;
		left: 50%;
		margin-left: -1px;
		width: 0px;
		border: 1.5px solid #FFFFFF;
		border-radius: 4px;
		transform: rotate(45deg);
	}

</style>