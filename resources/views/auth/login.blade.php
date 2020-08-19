<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <title>{{ env('APP_NAME') }}</title>
    <!-- Favicon-->
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" type="text/css">

    <!-- Bootstrap Core Css -->
    <link href="plugins/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Waves Effect Css -->
    <link href="plugins/node-waves/waves.css" rel="stylesheet" />

    <!-- Animation Css -->
    <link href="plugins/animate-css/animate.css" rel="stylesheet" />

    <!-- Custom Css -->
    <link href="css/style.css" rel="stylesheet">
</head>

<body class="login-page">
    <div class="login-box">
        
        <div class="card">
            <div class="body">
                @if(Session::has('mensaje_error'))
                    <div class="form-group has-error">
                        {{ Session::get('mensaje_error') }}
                    </div>
                @endif
                <form id="sign_in" action="{{route('login')}}" method="POST">
                        {{ csrf_field() }}
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">email</i>
                        </span>
                        <div class="form-line @error('email') error @enderror">
                            <input id="email" type="email" class="form-control" name="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                            @error('email')
                                <label id="email-error" class="error" for="email">{{ $message }}</label>
                            @enderror
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line @error('password') error @enderror">
                            <input id="password" type="password" class="form-control" name="password" placeholder="Password" required autocomplete="current-password">
                            @error('password')
                                <label id="password-error" class="error" for="password">{{ $message }}</label>
                            @enderror
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xs-12">
                            <button type="submit" class="btn btn-block bg-orange">
                                {{ __('Iniciar Sesión') }}
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </div>


    <!-- Jquery Core Js -->
    <script src="plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="plugins/node-waves/waves.js"></script>

    <!-- Validation Plugin Js -->
    <script src="plugins/jquery-validation/jquery.validate.js"></script>

    <!-- Custom Js -->
    <script src="js/admin.js"></script>
    <script src="js/pages/examples/sign-in.js"></script>
</body>

</html>