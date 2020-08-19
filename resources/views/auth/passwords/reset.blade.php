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

<body class="signup-page">
    <div class="signup-box">
        
        <div class="logo">
            <div class="image">
                <img src="../../images/logo.png" width="335" alt="Logo" />
            </div>
        </div>

        <div class="card">
            <div class="body">
            {{-- <div class="card-header">{{ __('Reset Password') }}</div> --}}
                <form id="sign_up" action="{{ route('password.update') }}" method="POST">
                    @csrf
                    <input type="hidden" name="token" value="{{ $token }}">
                    
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">email</i>
                        </span>
                        <div class="form-line">
                            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" placeholder="Email" value="{{ $email ?? old('email') }}" required autocomplete="email">
                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" placeholder="Password" required autocomplete="new-password" autofocus>
                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" placeholder="Confirmar Password" required autocomplete="new-password">
                        </div>
                    </div>

                    <button type="submit" class="btn btn-block bg-orange">
                        {{ __('Reset Password') }}
                    </button>

                    <div class="m-t-25 m-b--5 align-center">
                        @if (Route::has('login'))
                            <a class="btn btn-link" href="{{ route('login') }}">
                                {{ __('Inicia Sesión') }}
                            </a>
                        @endif
                        @if (Route::has('register'))
                            <a class="btn btn-link" href="{{ route('register') }}">
                                {{ __('Registrarse') }}
                            </a>
                        @endif
                    </div>
                </form>

            </div>
        </div>
        
        {{-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-center m-t-5">
            <div class="copyright">
                &copy; Teiker {{ date('Y') }}
                <a href="https://teiker.mx/terminos-y-condiciones/" target="_blank"> Términos &amp; Condiciones </a>
            </div>
        </div> --}}
    </div>


    <!-- Jquery Core Js -->
    <script src="../../plugins/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core Js -->
    <script src="../../plugins/bootstrap/js/bootstrap.js"></script>

    <!-- Waves Effect Plugin Js -->
    <script src="../../plugins/node-waves/waves.js"></script>

    <!-- Validation Plugin Js -->
    <script src="../../plugins/jquery-validation/jquery.validate.js"></script>

    <!-- Custom Js -->
    <script src="../../js/admin.js"></script>
    <script src="../../js/pages/examples/sign-up.js"></script>
</body>

</html>
