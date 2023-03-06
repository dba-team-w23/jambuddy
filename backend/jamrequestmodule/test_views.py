from .views import _is_valid_zip_code


def test_valid_five_digit_zip_code():
    assert _is_valid_zip_code("12345")


def test_valid_nine_digit_zip_code():
    assert _is_valid_zip_code("12345-6789")


def test_invalid_empty_input():
    assert not _is_valid_zip_code(None)


def test_invalid_short_input():
    assert not _is_valid_zip_code("12")


def test_invalid_long_input():
    assert not _is_valid_zip_code("12345678901")


def test_invalid_formatting():
    assert not _is_valid_zip_code("12345-67f0")
