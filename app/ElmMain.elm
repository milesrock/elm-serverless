port module ElmMain exposing (..)

import Json.Decode as Decode


-- UPDATE


type Msg
    = ReceiveMessage String


update : Msg -> String -> ( String, Cmd Msg )
update msg model =
    case msg of
        ReceiveMessage message ->
            let
                responseMsg =
                    message ++ "\n Hello World!"
            in
                model ! [ response (Response 200 responseMsg) ]



-- SUBSCRIPTIONS


type alias Response =
    { statusCode : Int
    , message : String
    }


port query : (String -> msg) -> Sub msg


port response : Response -> Cmd msg


subscriptions : String -> Sub Msg
subscriptions model =
    query ReceiveMessage



-- MAIN


main : Program Never String Msg
main =
    Platform.program
        { init = "" ! []
        , update = update
        , subscriptions = subscriptions
        }
