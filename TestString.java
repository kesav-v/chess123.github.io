public class TestString {
	public static void main(String[] args) {
		String a = "greeting";
		String b = "greeting";
		String c = b;
		System.out.println(a == b);
		System.out.println(a == c);
		System.out.println(b == c);
	}
}