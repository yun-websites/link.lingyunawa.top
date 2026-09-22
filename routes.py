"""Redirect targets kept separate from the FastAPI application."""

ROUTES: dict[str, object] = {
    "bilibili": {
        "space": "https://space.bilibili.com/3546844227439249",
        "liveroom": "https://live.bilibili.com/1982827092",
    },
    "authf": {
        "wechat": "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAASks8k1UNE1FQTM0M041UFBCV0NNSEkySVNUQldPVC4u",
        "qq": "https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAASks8k1UOTVGNElMT0MyTVo3M01HTzRPSkVHSlhVUC4u",
    },
    "ssf": {
        "eca": {
            "coding-2627": {
                "students": "https://rqssfz-my.sharepoint.com/:f:/g/personal/jim_lin_rqssfz_onmicrosoft_com/IgAPvsfUwBywRYVBeNn13shYATCDQC76n6p4RD2o7rNLytE?e=5apQdu",
            },
        },
    },
}
