module app {
	export enum CONST
	{
		//service
		SERVICE_GET_USER_DATA,
		SERVICE_GET_LEVEL_INFO,
		SERVICE_POST_FORM_DATA,
		//handler
		HANDLER_UPDATE_USER_DATA
	}

	export function config()
	{
		return {
			gameId:"",
			secretKey:"",
			url:""
		}
	}
}