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
                <img src="images/logo.png" width="335" alt="Logo" />
            </div>
        </div>

        <div class="card">
            <div class="body">
                <form id="sign_up" action="{{ route('register') }}" method="POST">
                    @csrf
                    {{-- <div class="align-center"> <h5>Registrarse</h5> </div> --}}
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name" placeholder="Nombre" value="{{ old('name') }}" required autocomplete="name" autofocus>

                            @error('name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            {{-- <input type="text" class="form-control" name="name" placeholder="Nombre" required autofocus> --}}
                        </div>
                    </div>
                    {{-- <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="apellidoP" placeholder="Apellido" required>
                        </div>
                    </div> --}}
                    <!-- <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="apellidoM" placeholder="Apellido Materno">
                        </div>
                    </div> -->
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">email</i>
                        </span>
                        <div class="form-line">
                            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" placeholder="Email" value="{{ old('email') }}" required autocomplete="email">

                            @error('email')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            {{-- <input type="email" class="form-control" name="email" placeholder="Email" required> --}}
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" placeholder="Password" required autocomplete="new-password">

                            @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            {{-- <input type="password" class="form-control" name="password" minlength="6" placeholder="Password" required> --}}
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">lock</i>
                        </span>
                        <div class="form-line">
                            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" placeholder="Confirmar Password" required autocomplete="new-password">
                            {{-- <input type="password" class="form-control" name="confirm" minlength="6" placeholder="Confirmar Password" required> --}}
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">person</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="referido" placeholder="Código Referido">
                        </div>
                    </div>
                    {{-- <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">phone</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="telefono" placeholder="Teléfono" required>
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">business</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="empresa" placeholder="Empresa" required>
                        </div>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon">
                            <i class="material-icons">assignment_return</i>
                        </span>
                        <div class="form-line">
                            <input type="text" class="form-control" name="referenciadoPor" placeholder="Código de Referencia (Opcional)">
                        </div>
                    </div> --}}
                   <!--  <div class="form-group">
                        <input type="checkbox" name="terms" id="terms" class="filled-in chk-col-pink">
                        <label for="terms">Acepto los <a href="https://teiker.mx/terminos-y-condiciones/" target="_blank"> Términos &amp; Condiciones </a>.</label>
                    </div> -->
                    <button type="submit" class="btn btn-block bg-orange">
                        {{ __('Registrarse') }}
                    </button>

                    <div class="m-t-25 m-b--5 align-center">
                        @if (Route::has('login'))
                            <a class="btn btn-link" href="{{ route('login') }}">
                                {{ __('¿Ya estas registrado? | Inicia Sesión') }}
                            </a>
                        @endif
                    </div>
                </form>

            </div>
        </div>
        
        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-center m-t-5">
            <div class="copyright">
                &copy; Teiker {{ date('Y') }}
                <a href="https://teiker.mx/terminos-y-condiciones/" target="_blank"> Términos &amp; Condiciones </a>
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
    <script src="js/pages/examples/sign-up.js"></script>
</body>

</html>
